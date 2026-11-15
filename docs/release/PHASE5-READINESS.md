# Phase 5 — Zyberlane release-readiness gate

Status: **IN PROGRESS — NOT APPROVED FOR PUBLIC LAUNCH**
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
| Contact delivery | Client-side mailto only | Owner chooses explicit mailto-only experience or provides a configured and tested HTTPS delivery service; every UI status reflects actual outcome |
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

## Immediate work orders

- [ ] Approve a page-by-page rights-cleared image/video/logo register; archive proof of rights outside public repo as needed.
- [ ] Approve public claims, labels, testimonials and global footer/tagline consistency.
- [ ] Supply legally accurate entity/operator identity, data retention and processors; obtain final policy review.
- [ ] Decide contact strategy (explicit mailto-only **or** real endpoint). If endpoint: configure provider and test deliverability, failures, consent, privacy and spam mitigation.
- [ ] Re-run final website regression and collect source-linked evidence.
- [ ] Obtain explicit production go/no-go approval.

See: [media](MEDIA-AND-CONTENT.md), [legal](LEGAL-REVIEW.md), [contact](CONTACT-DELIVERY.md).
