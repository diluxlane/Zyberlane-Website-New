// Zyberlane website enquiry endpoint (Vercel Node.js function).
// No secrets or user submissions belong in source control or logs.
// Email sending stays disabled until RESEND_API_KEY, CONTACT_FROM_EMAIL,
// and CONTACT_TO_EMAIL are set in the Vercel environment.
const MAX_BODY_BYTES = 8192;
const MAIL = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]{2,}$/;

function result(status, payload) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

async function limitedText(request) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder();
  let total = 0;
  let body = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
    return body + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

function field(value, max, required = false) {
  if (value === undefined || value === null) value = '';
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  if (cleaned.length > max || (required && !cleaned)) return null;
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(cleaned)) return null;
  return cleaned;
}

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return result(403, { ok: false, error: 'origin_not_allowed' });
  if (request.headers.get('sec-fetch-site') === 'cross-site') return result(403, { ok: false, error: 'origin_not_allowed' });
  if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) {
    return result(415, { ok: false, error: 'json_required' });
  }
  const size = Number(request.headers.get('content-length') || 0);
  if (size > MAX_BODY_BYTES) return result(413, { ok: false, error: 'too_large' });

  // Fail closed: no unconfigured deployment can silently pretend to send.
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to || !MAIL.test(from) || !MAIL.test(to)) {
    return result(503, { ok: false, error: 'delivery_unavailable' });
  }

  let input;
  try {
    const raw = await limitedText(request);
    if (raw === null) return result(413, { ok: false, error: 'too_large' });
    input = JSON.parse(raw);
  } catch {
    return result(400, { ok: false, error: 'invalid_json' });
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return result(422, { ok: false, error: 'invalid_input' });
  }

  const name = field(input.name, 120, true);
  const email = field(input.email, 254, true);
  const company = field(input.company, 160);
  const build = field(input.build, 140);
  const budget = field(input.budget, 120);
  const idea = field(input.idea, 2500, true);
  const trap = field(input.trap, 200);
  const help = input.help ?? [];
  if (
    [name, email, company, build, budget, idea, trap].some(v => v === null) ||
    !MAIL.test(email || '') ||
    !Array.isArray(help) || help.length > 10 ||
    help.some(x => field(x, 140, true) === null) ||
    trap
  ) {
    return result(422, { ok: false, error: 'invalid_input' });
  }

  const safeName = name.replace(/[\r\n]+/g, ' ');
  const lines = [
    'New enquiry from Zyberlane website',
    'Name: ' + safeName,
    'Email: ' + email,
    'Company / Brand: ' + (company || '(not provided)'),
    'Project: ' + (build || '(not provided)'),
    'Help: ' + (help.join(', ') || '(not provided)'),
    'Budget: ' + (budget || '(not provided)'),
    '', 'Message:', idea
  ];

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'ZyberlaneContact/1.0'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: 'Zyberlane website enquiry - ' + safeName,
        text: lines.join('\n')
      }),
      signal: AbortSignal.timeout(8000)
    });
  } catch {
    return result(502, { ok: false, error: 'delivery_failed' });
  }
  if (!response.ok) return result(502, { ok: false, error: 'delivery_failed' });
  let confirmation;
  try { confirmation = await response.json(); } catch { return result(502, { ok: false, error: 'delivery_failed' }); }
  if (!confirmation || typeof confirmation.id !== 'string' || !confirmation.id.trim()) {
    return result(502, { ok: false, error: 'delivery_failed' });
  }
  // Provider accepted the request; mailbox receipt must still be tested.
  return result(202, { ok: true, status: 'accepted' });
}

export function GET() {
  return result(405, { ok: false, error: 'method_not_allowed' });
}
