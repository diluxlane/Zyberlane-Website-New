# Phase 5 — Zyberlane release-readiness gate

Status: **IN PROGRESS — NOT APPROVED FOR PUBLIC LAUNCH**
Owner decisions received 2026-11-15: Zyberlane, Sri Lanka, unregistered independent business; **automatic** contact delivery to `contact@zyberlane.com`. Live service credentials, domain verification, final legal facts and final media still pending.
Baseline: `main` following [Phase 4 PR #6](https://github.com/diluxlane/Zyberlane-Website-New/pull/6) and [owner-attested QA sign-off](../qa/PHASE4-QA-SIGNOFF-2026-11-15.md).
Prepared: 2026-11-15 (Asia/Colombo).
Scope: final media, business content, legal/privacy policies and contact delivery. **Preserve the monochrome design, existing animations, page structure and production separation.**

## Verified repo observations at this baseline

- `dist/privacy/index.html` uses the repeated phrase "Development preview. The chat and preferences use browser storage. The enquiry form opens your email app; it does not silently send your enquiry. Contact contact@zyberlane.com for questions. Policy approval is required before release." throughout titled policy sections. It is **not a final privacy policy**.
- `dist/terms/index.html` has a "Coming soon" terms section and explicitly says final terms require owner approval. It is **not a final Terms of Service**.
- `dist/contact/index.html`: `data-endpoint=""` and `action="mailto:contact@zyberlane.com"`; the built JS invokes `mailto:` when no endpoint is configured. The form tells visitors to review/send the email themselves. A test of this fallback does **not** establish server-side delivery.
- `THIRD-PARTY-NOTICES.md` documents 1,492 neutral demonstration media fixtures, including 88 silent placeholder videos, and an approximate SVG logo trace. These are not approved final brand/media.
- `dist/work/index.html` clearly distinguishes one confirmed client project (Divine Tattoo) from 29 demonstrations, XR experimental, and Creative Lab planned. Retain these distinctions in any final content.
- Footer copy on inspected pages still includes `ZYBERLANE Creative Studios` and `BUILT DIFFERENT. BUILT FOR YOU.` despite the agreed brand positioning `Creative Technology Company` and slogan `Built Beyond Boundaries.`. A separate content consistency review is required before replacing all repeated site components.
- `dist/robots.txt` disallows crawling, `vercel.json` sets `X-Robots-Tag: noindex, nofollow, noarchive`, and reviewed HTML also has noindex. These protections must remain in staging and must be deliberately reviewed when configuring *separate* production.
- Site uses a deterministic local chatbot; no claim of autonomous AI support or server-side storage should be made.

## Workstreams and acceptance requirements

| Workstream | Current status | Ready only when |
| --- | --- | --- |
| Media and identity | Fixtures remain | Licensed/factually authorized originals are selected, optimized, assigned by page, and verified; logo SVG approved or replaced |
| Content and claims | Phase 4 wording corrected; legacy shared copy remains | Brand names/tagline, all page titles, case studies, FAQ, social links, demos, reviews and contact labels are consistently truthful |
| Privacy/cookies | Placeholder | Owner-approved policy accurately reflects real deployment, local storage, cookies, hosting, analytics, processors, retention and rights |
| Terms | Placeholder | Owner-approved terms include accurate identity, website-use terms, project contracting boundaries and dispute/contact details |
| Contact delivery | **Automatic mode approved and branch implementation prepared; not live** | Configure verified sender, email service and destination; perform real inbox receipt and failure tests; no false success |
| Technical release | Owner-attested Phase 4 QA | Fresh QA on the *final* release head, media loads, contact tests, license checks, correct production environment, SEO/indexing review |
| Launch | Not approved | Owner separately approves production, domains, indexing and launch checklist |

## Release blocking rules

1. Do not copy unlicensed media from the upstream TESERACT project into the production site or remove required source/dependency notices without validated rights.
2. Do not present 29 layout demonstrations as paying clients, invented testimonials, released XR worlds or live Creative Lab experiments.
3. Do not describe mailto as a delivered or stored enquiry; a visitor has to send the draft in their own email app.
4. Do not ship placeholder Privacy/Terms as if approved legal documents.
5. Do not expose form API keys or server secrets in `dist/`; use server-side configuration and anti-abuse controls for any endpoint.
6. Do not remove noindex or change DNS/old Netlify production without separately approved launch instructions.
7. Do not accept screenshots, checksums, browser results or media-rights documents that have not actually been produced; record evidence provenance.

## Owner-approved sequencing update — 2026-11-15

The owner explicitly requested that **final website photographs, videos, logo/identity asset replacement, additional real-project case studies, and testimonials be deferred** until genuine Zyberlane projects and supporting media are developed and authorized. This is a deliberate sequencing choice, **not** an approval of existing fixtures as final assets and **not** a waiver of release requirements.

- **Deferred to portfolio/media integration stage:** media fixture replacement, new case studies, testimonial collection/verification, and final logo asset review. Preserve truthful demonstration labels in the interim; do not invent assets, reviews, project outcomes, or client permissions.
- **Active separately:** automatic contact form delivery service configuration and real inbox tests; legally accurate Privacy/Terms preparation and approval; consistent existing business copy when reviewed.
- **Next product-building priority:** complete and validate an original Zyberlane project in its own repository, starting with `diluxlane/Zyberlane-XR` (experimental), then original Creative Lab work; verify `diluxlane/project1` as an attributed/authorized adaptation before any commercial claims. Integrate only completed and truthful work into the website.
- **GitHub account:** use the connected `diluxlane` account for Zyberlane project repository writes and PRs. This is separate from the official website social organization URL `https://github.com/Zyberlane`, which remains unchanged unless the owner approves a change.
- **Release gate remains:** do not launch the site publicly with unapproved media, placeholder policies, unverified contact delivery or unapproved source/license claims. No DNS, old production or indexing changes are authorized by this sequencing update.

## Immediate work orders

- [ ] **Deferred by owner** — approve a page-by-page rights-cleared image/video/logo register after genuine project assets are prepared; archive proof of rights outside public repo as needed.
- [ ] **Deferred by owner for new work/testimonials** — publish new case studies and authenticated testimonials only after actual projects and approvals. Continue independently checking existing shared branding/footer copy without inventing work.
- [x] Record brand name Zyberlane, Sri Lanka, unregistered independent business. [ ] Confirm contracting-party/operator identity, retention and processors; [ ] obtain final policy review.
- [x] Decide contact strategy: automatic form delivery approved. [ ] Verify/connect email provider, configure secret variables and sender/domain; [ ] pass end-to-end delivery, failure, consent, privacy and spam/rate-limiting tests.
- [ ] Re-run final website regression and collect source-linked evidence.
- [ ] Obtain explicit production go/no-go approval.

See: [media](MEDIA-AND-CONTENT.md), [legal](LEGAL-REVIEW.md), [contact](CONTACT-DELIVERY.md).
