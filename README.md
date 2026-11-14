# Zyberlane Website — development review

Rebranding implementation for `diluxlane/Zyberlane-Website-New`, based on TESERACT commit `b073ac6492efae12c131b4a8fa1be786bc80af81`.

## Run locally

Serve `dist/` as the HTTP document root. No dependency installation or build step is required:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. Fetch-based chat loading requires HTTP rather than opening files directly.

## Preview configuration

Vercel output directory: `dist`. Automatic Git-triggered Vercel deployments are disabled in vercel.json. Preview indexing is disabled using page metadata, robots.txt and X-Robots-Tag. Noindex does not provide access protection. A hosted preview requires separate owner authorization; production release remains manual. Do not connect this branch to existing Netlify production or change DNS.

## Review scope

All 41 original HTML documents remain, with the original main application JavaScript and stylesheets. Six existing Zyberlane business-service categories and two clearly labelled experimental showcase areas preserve the eight-slot layout. These research showcases are not additional client service offers. Divine Tattoo occupies the retained `projects/aivinci/` template; the other 29 project pages are demonstrations. Original photos and films are replaced with labelled fixtures while rights-cleared business media is prepared.

The form opens an email draft addressed to contact@zyberlane.com. No mail backend was added. The chatbot remains local and deterministic.

See THIRD-PARTY-NOTICES.md for source attribution and dependency licenses. Private audit and permission correspondence are excluded from this repository.

## Validation

Prior browser run: 123 route/viewport combinations, 102 interaction assertions in that route suite, 20 comparison assertions, and selected direct chat/keyboard checks. Cross-browser, physical-device, exhaustive motion, final media and release testing remain incomplete. The package hashes and JavaScript syntax were rechecked before this PR.

Three demonstration project routes use neutral slugs: `demonstration-portfolio`, `demonstration-desk` and `demonstration-cinematic`. Their page structures and linked media remain. The contact link opens the contact page; no WhatsApp number is included.
