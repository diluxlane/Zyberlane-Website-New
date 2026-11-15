# Phase 5 — automatic enquiry email setup

**State: CODE PREPARED, SERVICE NOT CONNECTED.** Automatic contact form submission was approved by the owner on 2026-11-15. Do not claim this works on the live site until tests with genuinely delivered messages pass.

## Architecture

- Front end: `dist/contact/index.html` points to the same-origin `/api/contact` on JavaScript-enabled browsers; `dist/app.js` sends JSON and requires provider acceptance.
- Server: `api/contact.mjs` is a dependency-free Vercel Node.js function. It validates name/email/idea and optional categories, body size, honeypot, and same-origin browser POST. It sends **text-only** email using Resend's documented HTTPS REST API. No visitor contents are logged by this function.
- Reply-to is the validated visitor email; the destination comes from a server secret, never from a form input. API failures, missing credentials or missing provider confirmation return errors; no successful submission is shown.
- No-JavaScript browser fallback remains `mailto:contact@zyberlane.com`.
- Provider acceptance = enqueued for delivery. It **does not** demonstrate that the mailbox received it.

## Setup requiring operator action

1. **Accept/approve the proposed Resend email processor** after reviewing its terms, privacy and data processing. The owner has approved automatic delivery but has **not** selected/connected this vendor; the adapter can be replaced if needed.
2. In the **separate Vercel staging project only**, connect Resend or create a Resend account. Verify ownership of the sending domain and the DNS records with the domain administrator. Do not change production DNS or old Netlify without authorization.
3. Configure these **Vercel Environment Variables**, not GitHub or chat messages:
   - `RESEND_API_KEY`: secret Resend sending key, server-side only.
   - `CONTACT_FROM_EMAIL`: sender mailbox at the verified domain (suggested `no-reply@zyberlane.com` **only after verification**; no value is preconfigured).
   - `CONTACT_TO_EMAIL`: actual receiving email inbox (owner approved `contact@zyberlane.com`; verify the mailbox genuinely receives email).
4. Redeploy staging and confirm `/api/contact` exists as a Vercel Function and `dist/` remains the static output directory. Missing configuration intentionally returns HTTP 503; neither the browser nor the API can claim successful sending.
5. Do **not** submit real visitor details during staging tests; use authorized test identities and a designated test recipient if appropriate.
6. Test: required-field failures, invalid email, honeypot, >8 KB body, missing configuration (503), cross-site request (403), provider failure (502), successful provider response (202), and actual inbox receipt and reply-to behavior. Also confirm no secret, visitor content or uncontrolled personal information is logged.
7. Configure **persistent abuse protection** (e.g., provider/WAF rules and rate limits); browser honeypot and origin checks alone are insufficient for a publicly exposed API.
8. Finalize and approve the Privacy Policy before enabling public collection: identify actual provider, data categories, recipients, processing locations, retention and access/deletion procedures. Review service/data processing terms, spam handling and handling of minors' enquiries if applicable.
9. Obtain owner sign-off, browser/device checks on the final head, and separate production authorization.

## Tests

Run `node --test tests/contact.test.mjs` using Node.js 22 or another current supported Node version. All tests mock the outbound email provider; a green unit test does not constitute delivery verification. CI workflow: `.github/workflows/contact-tests.yml`.

## Failure handling

When a provider response fails, the visitor's form remains available for retry and the page displays a direct email link. Never display “sent” on HTTP errors. No browser client can embed `RESEND_API_KEY`; keep it exclusively in the server-side environment.

## Source references

- https://vercel.com/docs/project-configuration/vercel-json — root `api/` functions and output directory
- https://vercel.com/docs/functions/runtimes/node-js — Node.js runtime and module format
- https://resend.com/vercel — official Resend/Vercel email API examples

**Not authorized:** live email activation, final legal policy publication, public release, DNS switching, or production edits.
