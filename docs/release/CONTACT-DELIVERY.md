# Contact delivery requirements and implementation decision

**Current implementation:** client-side email draft, *not a backend*.
**Owner choice required before changing behavior:** mailto-only as the deliberate final design **or** real form delivery via an approved HTTPS endpoint.

## Verified source behavior

- `dist/contact/index.html`: form `action="mailto:contact@zyberlane.com"`, `method="post"`, `enctype="text/plain"`, `data-email="contact@zyberlane.com"`, `data-endpoint=""`.
- `dist/app.js`: validates fields and uses `window.location.href = mailtoHref(d)` when endpoint is empty, then displays a mail-handoff state. With endpoint configured it POSTs FormData and expects an HTTP success response.
- The page already states: "This form prepares an email in your email app. Review and send it yourself."
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

**Decision record:** Unselected. Do not switch from mailto to an unknown provider on assumptions. Preserve existing working fallback and app architecture until approved and tested.
