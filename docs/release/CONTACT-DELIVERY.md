# Contact delivery requirements and implementation decision

**Owner decision (2026-11-15):** **Automatic** form submission to the business mailbox `contact@zyberlane.com`; retain an honest direct-email fallback.
**Implementation on this branch:** same-origin `/api/contact` endpoint via `api/contact.mjs`, JSON `POST` from `dist/app.js`, and contact markup wired to that endpoint. This is **code-prepared, not live email delivery**.
**Service status:** Resend REST adapter included as a proposed provider; no credentials or verified sender domain were supplied or configured. The handler deliberately returns HTTP 503 and the UI shows an error until configured. Do not claim mailbox delivery without a real receipt test.

## Verified source behavior

- At the Phase 4 baseline, `data-endpoint=""`. On the Phase 5 branch, `data-endpoint="/api/contact"`, while the native `action="mailto:contact@zyberlane.com"` remains available when JavaScript is disabled.
- `dist/app.js` still retains the mailto fallback when no endpoint is specified, but now submits JSON to `/api/contact` when configured and requires `{ok:true,status:"accepted"}` in the response before showing a confirmation. Provider acceptance does not prove inbox receipt.
- The Phase 5 page explains it attempts automatic sending through an email service and instructs visitors to use direct email if delivery fails. It does not falsely report successful sending when the backend is missing.
- Existing form categories include business services, original product and creative technology collaboration, partnerships/research and maintenance/support.
- Approved WhatsApp Business: +94 71 152 4659; chatbot and About links should route consistently.
- The chatbot is local/deterministic; contact capture must not be misrepresented as CRM delivery.

## Option A — explicit mailto-only

No backend or secrets required. Keep accurate draft wording, accessible direct email and WhatsApp alternatives, and test handoff with/no mail app. State clearly that completing the web form alone **does not send** a message. No delivery/response guarantees.

## Option B — verified HTTPS endpoint (recommended if reliable enquiries are required)

**Do not configure a guessed provider, form ID, API token or production address.**
The owner must designate the receiving service, verified destination mailbox and data-processing/retention requirements. Requirements:

- Server-managed secret credentials; HTTPS, strict endpoint allowlist, no public API keys.
- Spam mitigation/honeypot, request limits, input validation and sensible payload-size limits.
- Accessible loading, explicit success only after actual accepted response, user-friendly errors and retry/fallback mailto.
- Delivery tests with genuinely received mail or provider event evidence, bounced-email/error tests, duplicate handling and accessible keyboard/mobile flow.
- Update Privacy policy for the **actual** processor, data categories, storage and retention; determine consent and legal basis accurately.
- Monitor failed delivery without exposing visitor enquiry content in logs or GitHub.
- Deployment configuration isolated from old production; staging test address separated from real customer mailbox.

## Acceptance matrix

| Scenario | Expected evidence |
| --- | --- |
| Empty/malformed required fields | Validation and keyboard focus behave correctly |
| Mobile and desktop handoff | Mailto opens draft and requires explicit send; direct email remains usable |
| Valid backend submit (only Option B) | Server accepts; actual destination receives; success is not displayed early |
| Backend failure/timeout (Option B) | No false 'sent' state; retry or clear alternative |
| Spam/invalid/oversized input (Option B) | Rejected or handled without leaking details |
| WhatsApp and chatbot route | Correct verified contact target and context |
| Privacy/data minimization | Real processors/retention accurately documented and approved |

**Decision record:** Automatic delivery approved by owner on 2026-11-15; implementation prepared with Resend as a replaceable proposed provider. Connection/verified domain and recipient setup, owner acceptance of the actual processor, spam/rate-limit protection, data-policy update and inbox receipt testing are **blocking** before making this feature public. The code fails closed without credentials. See [setup guide](EMAIL-SETUP.md).
