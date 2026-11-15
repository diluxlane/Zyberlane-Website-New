# Zyberlane — one umbrella brand system
Version: 1.0 — 2026-11-15

## Source of truth

**Master brand:** ZYBERLANE  
**Descriptor:** CREATIVE TECHNOLOGY COMPANY  
**Tagline:** Built Beyond Boundaries.  
**Short company label:** Zyberlane — Creative Technology Company  
**Confirmed operating facts:** Sri Lanka; unregistered independent business. "Company" here describes brand positioning and does **not** represent a registered corporation, incorporation or claimed legal status.

## Visual signature

Use the original **geometric ZYBERLANE wordmark** authored specifically for the brand, paired with the established ZL mark. The source screenshot of TESERACT demonstrates the intended category of futuristic, spaced lettering, but no TESERACT glyphs or font files have been copied.

Canonical artifacts:

- `dist/assets/zyberlane/logo-white.svg` — approved existing ZL icon for dark surfaces.
- `dist/assets/brand/zyberlane-wordmark.svg` — original ZYBERLANE vector lettering; 9 independent outlined characters, font-independent.
- `dist/assets/brand/zyberlane-lockup.svg` — complete icon, lettering and descriptor, for future project exports and static media.
- `dist/assets/inter-tight-latin.woff2`, `dist/assets/inter-tight-latin-italic.woff2` — licensed UI typography (Inter Tight OFL notice at `dist/licenses/Inter-Tight-OFL.txt`). **The logo is not typed in Inter Tight.**

**Never** replace the custom vector mark with an ordinary text run, stretch text using SVG `textLength`, copy third-party logo fonts or attach an unrelated product wordmark to the ZL icon.

## Identity anatomy

```
[ ZL ICON ]  Z Y B E R L A N E    / PRODUCT
             CREATIVE TECHNOLOGY COMPANY

             Built Beyond Boundaries.
```

The approved brand descriptor and slogan are distinct: descriptor appears beneath the wordmark in **header, intro and footer**. The slogan appears in the footer text, footer motto and relevant brand-led hero copy. Product labels such as **/ XR** or **/ LABS** are suffixes, not replacements for the parent brand.

## Visual tokens

| Role | Source |
| --- | --- |
| Background | `#000000` |
| Secondary background | `#060606` |
| Surface 1 | `#0d0d0d` |
| Surface 2 | `#141414` |
| Surface 3 | `#1c1c1c` |
| Primary text | `#f4f4f2` |
| Secondary text | `rgba(244,244,242,.74)` |
| Muted text | `rgba(244,244,242,.4)` |
| Stroke/separator | `rgba(255,255,255,.1)` |
| Website main font | `TS Sans / Helvetica Neue / Inter Tight / system-ui` |
| Main easing | `cubic-bezier(.22,1,.36,1)` |
| Brand voice | Clear, experimental, original, factual; no invented testimonials, team or client outcomes |

## Header / intro / footer implementation

The company website has **42 HTML documents**, including project pages, legal pages, contact and 404 routes. Each uses the same original wordmark vector paths in:

- `.hdr-brand__word` — fixed ZL icon plus vector wordmark and company descriptor;
- `.tsi__word` — original intro motion system retained with new vector lettering and descriptor;
- `.ft-bar__brand` or compact `.ft__bigmark` — mark, wordmark and descriptor; bottom footer motto matches the slogan.

The company website keeps its existing complex intro and site animation architecture. New image-free vector lettering inherits `currentColor` for readable monochrome light/dark transitions. The matching XR website uses the exact same external SVG assets for clarity and independence from the company deployment.

## Future Creative Lab and product adoption

There was **no accessible `diluxlane/Zyberlane-Creative-Lab` repository** when this version was prepared. This file and the two vector assets form the canonical kit to copy into new projects later.

For future `labs.zyberlane.com` and independent products:

1. Reuse exact ZL icon and `zyberlane-wordmark.svg` (or `zyberlane-lockup.svg`). Product name appears as a suffix: `/ LABS`, `/ XR`, etc.
2. Keep **CREATIVE TECHNOLOGY COMPANY** descriptor with the ZYBERLANE wordmark in headers, opening sections and footers, and **Built Beyond Boundaries.** in the footer.
3. Reuse tokens and standard layout structure; use restrained hover/reveal patterns with real `prefers-reduced-motion` support. Do not transplant heavy marketing intro code into performance-sensitive immersive apps.
4. Respect route-local URLs, noindex on development previews, privacy and device permission boundaries, and all licensed asset attribution.
5. Verify branding and functionality on actual devices. Do not claim a future experiment is already shipped.

**Product-specific exceptions:** XR VR headset fullscreen should not trigger marketing entrance animations or be placed inside transform/overflow clips; WebGL renderer remains independent. Creative Lab can present experimental demos without pretending they are paid client work.

## Release and provenance

Design implementation is **PR-only until owner review**. This brand update does not approve public launch, alter legal registration claims, finalize imagery or testimonials, change contact backend, or deploy new domains. The parent site and XR need independent visual/browser QA following branding updates.

Brand consistency tests: `node --test tests/brand-identity.test.mjs` in the company repository.
