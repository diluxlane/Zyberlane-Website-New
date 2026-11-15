// Run with: node --test tests/contact.test.mjs
// No email is sent: global fetch is replaced with a local fake.
import test from 'node:test';
import assert from 'node:assert/strict';
import { POST, GET } from '../api/contact.mjs';

const API = 'https://staging.example.invalid/api/contact';
const payload = {
  name: 'Example Visitor', email: 'visitor@example.org', company: 'Example Studio',
  build: 'Web Design & Development', help: ['Web Design & Development'],
  budget: 'Discuss', idea: 'I have a website project.', trap: ''
};
const prior = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL
};
const originalFetch = globalThis.fetch;

function request(data = payload, origin = 'https://staging.example.invalid') {
  return new Request(API, {
    method: 'POST',
    headers: { origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
function configure() {
  process.env.RESEND_API_KEY = 'unit-test-only';
  process.env.CONTACT_FROM_EMAIL = 'no-reply@example.org';
  process.env.CONTACT_TO_EMAIL = 'inbox@example.org';
}
test.after(() => {
  for (const [k, v] of Object.entries(prior)) {
    if (v === undefined) delete process.env[k]; else process.env[k] = v;
  }
  globalThis.fetch = originalFetch;
});
test('GET is not a send', async () => {
  assert.equal((await GET()).status, 405);
});
test('without server credentials fails closed and makes no send', async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  delete process.env.CONTACT_TO_EMAIL;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('unexpected'); };
  const res = await POST(request());
  assert.equal(res.status, 503);
  assert.equal(calls, 0);
});
test('rejects cross-origin and invalid email without sending', async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('unexpected'); };
  assert.equal((await POST(request(payload, 'https://other.invalid'))).status, 403);
  assert.equal((await POST(request({ ...payload, email: 'invalid' }))).status, 422);
  assert.equal(calls, 0);
});
test('rejects honeypot and too-large requests', async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('unexpected'); };
  assert.equal((await POST(request({ ...payload, trap: 'bot' }))).status, 422);
  assert.equal((await POST(request({ ...payload, idea: 'x'.repeat(9000) }))).status, 413);
  assert.equal(calls, 0);
});
test('provider acceptance returns 202 and sends only to configured address', async () => {
  configure();
  let sent;
  globalThis.fetch = async (_url, options) => {
    sent = JSON.parse(options.body);
    assert.equal(options.headers.Authorization, 'Bearer unit-test-only');
    return Response.json({ id: 'test-provider-id' });
  };
  const res = await POST(request());
  assert.equal(res.status, 202);
  assert.deepEqual(await res.json(), { ok: true, status: 'accepted' });
  assert.deepEqual(sent.to, ['inbox@example.org']);
  assert.equal(sent.reply_to, payload.email);
  assert.equal(sent.text.includes(payload.idea), true);
});
test('provider error never reports success', async () => {
  configure();
  globalThis.fetch = async () => Response.json({ error: 'rate limited' }, { status: 429 });
  const res = await POST(request());
  assert.equal(res.status, 502);
  assert.equal((await res.json()).ok, false);
});
