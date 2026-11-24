# Media and content — approval and replacement register

Status: **31 homepage editorial images authorized by owner attestation; remaining media and release review pending.**
Baseline: Phase 4 on `diluxlane/Zyberlane-Website-New`.

## Media facts and decisions

- `THIRD-PARTY-NOTICES.md` originally reported **1,492** neutral demo media paths, of which **88** are silent 1-fps placeholder video files. Do not count these as final film/video assets.
- The retained original media belongs to the upstream TESERACT design baseline and was *not* imported as unrestricted commercial stock. Rights to source code do not independently prove rights to photos, original-client screenshots or films.
- Brand ZL monogram: an owner-supplied raster was preserved, variants derived, and an approximate SVG traced. Approve SVG accuracy against approved raster before relying on it as master identity.
- A screenshot or actual outcome for a client project must be sourced from the project and cleared for public display, not inferred from demo visuals.

## Asset register required (per file or logical asset group)

| Required field | Meaning |
| --- | --- |
| File/path and page placement | Exact `dist/assets/...` target and where it is used |
| Asset category | Logo, hero, project image, video, poster, UI preview, OG image |
| Origin/owner | Photographer, client, project team, licensed provider, original creation |
| Permission record | Rights, territory, modification, commercial/public use, duration and credit terms |
| Approval status | Pending / approved / rejected, with approval date and reviewer |
| Accessibility | Contextual alt text or decorative marking, caption/transcript where appropriate |
| Technical validation | Format, width/height, compression, poster/fallback, playback and responsive load |
| Evidence location | Safe link to private contract/consent or internal approval; no personal documents in public repository |

## Public-content acceptance

- Brand title: **Zyberlane — Creative Technology Company**.
- Approved slogan: **Built Beyond Boundaries.** (exact spelling/punctuation).
- Retain approved monochrome palette and original structure/motion; do not restyle as part of content cleanup.
- Reconcile legacy global footer branding `Creative Studios`, `BUILT DIFFERENT. BUILT FOR YOU.` with approved copy, without making unapproved changes to other creative headings.
- Maintain work categories: **Divine Tattoo (one confirmed client)**, **Zyberlane XR (experimental)**, **Creative Lab (planned)**, **29 demonstrations (not client work)**.
- Audit `dist/client-stories/` for template testimonials. Publish only authenticated/authorized actual client feedback; otherwise label demonstration or withhold.
- Validate every social/org link; the approved official GitHub organization is https://github.com/Zyberlane, while development/source repos under `diluxlane` are separate.
- Verify project page names, screenshots, titles, OpenGraph images and descriptions match actual releases.
- Avoid claims about proprietary headsets, real eye tracking, finished XR games, or launched Creative Lab works.
- Check image posters/playback on mobile; test reduced motion and accessibility when swapping assets.

## Deployment gate

Fixtures may remain in a private noindex *development demonstration*, honestly labelled, while approved replacements are prepared. They must **not** be silently relabelled as real past client work or original commercial portfolio media. Final asset approval and a new visual regression pass are required before public release.

## 2026-11-24 — scoped editorial-media restoration

The Zyberlane owner confirmed by chat that the original owner granted full reuse and modification permission by telephone and supplied their fork, [diluxlane/Teseract-creative-studious](https://github.com/diluxlane/Teseract-creative-studious). Permission is owner-attested; no independent written contract or separate third-party rights records were inspected. The 31 homepage WebP assets (meeting composition, six philosophy artworks, hand and laptop layers, and five astronaut composition files) were restored byte-for-byte from commit `b073ac6492efae12c131b4a8fa1be786bc80af81`. This scope is editorial/illustrative only, not evidence of Zyberlane staff, client work, testimonials or results. All other demo images and 88 placeholder videos remain unchanged. No public release, production deployment or DNS change is authorized. Fresh visual/device QA remains required.

Homepage completion step 1: restored the five original astronaut body, splash, shadow and 480w responsive files under the same owner-attested permission. Existing animation classes, image geometry and responsive markup remain unchanged; live visual QA is still required.
