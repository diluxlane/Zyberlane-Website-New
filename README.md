# Zyberlane Website — development review

Rebranding implementation for `diluxlane/Zyberlane-Website-New`, based on TESERACT commit `b073ac6492efae12c131b4a8fa1be786bc80af81`.

## Run locally

Serve `dist/` as the HTTP document root. No dependency installation or build step is required:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. Fetch-based chat loading requires HTTP rather than opening files directly.

## Preview configuration

Vercel output directory: `dist`. Git-triggered Vercel deployments are enabled in vercel.json; verify the connected Vercel project and domain before a production release. Preview indexing is disabled using page metadata, robots.txt and X-Robots-Tag. Noindex does not provide access protection. A hosted preview requires separate owner authorization; production release remains manual. Do not connect this branch to existing Netlify production or change DNS.

## Review scope

All 41 original HTML documents remain, with the original main application JavaScript and stylesheets. Six existing Zyberlane business-service categories and two clearly labelled experimental showcase areas preserve the eight-slot layout. These research showcases are not additional client service offers. Divine Tattoo occupies the retained `projects/aivinci/` template; the other 29 project pages are demonstrations. Original photos and films are replaced with labelled fixtures while rights-cleared business media is prepared.

The contact form opens a prefilled email draft addressed to contact@zyberlane.com; a server-side mail delivery backend is not configured. Contact options include email and the verified WhatsApp Business link (+94 71 152 4659). The social GitHub URL intentionally points to the Zyberlane organization (https://github.com/Zyberlane), not to the site contributor account. The chatbot remains local and deterministic.

See THIRD-PARTY-NOTICES.md for source attribution and dependency licenses. Private audit and permission correspondence are excluded from this repository.

## Validation

Historical baseline only: an earlier implementation reported 123 route/viewport combinations, 102 route-suite interaction assertions, 20 comparison assertions, and selected direct chat/keyboard checks. These are not fresh Phase 4 browser results. Phase 4 static inspections check page palettes, contact routing, chatbot knowledge, demo/page metadata and the 42 HTML files (41 original pages plus an additional 404 variant). Physical-device/browser behavior, dynamic motion and full visual regression, final media/rights clearance and production release testing remain to be performed. Existing package hashes must be regenerated or checked against any updated files; do not treat prior hashes as current.

Three demonstration project routes use neutral slugs: `demonstration-portfolio`, `demonstration-desk` and `demonstration-cinematic`. Their page structures and linked media remain. The contact link opens the contact page, and the approved WhatsApp Business contact is provided as a separate external link. Phase 4 keeps the website's visual layout and underlying interaction architecture while neutralizing saturated inline color values, aligning contact/support/collaboration options, and correcting SEO descriptions on demos and legal pages.
