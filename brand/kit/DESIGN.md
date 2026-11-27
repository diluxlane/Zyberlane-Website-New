# Design system

## Identity
Preserve the four original vector paths and nine custom wordmark glyphs. The full lockup includes every monogram path; the descriptor uses live text and may vary by system font. Do not stretch, rotate, recolor, add effects to, or typeset the wordmark. Keep at least one-quarter of the mark width clear from other graphics (proposed print/digital rule). Avatar uses exactly 54% width and a centered bounding box; see geometry.json.

## Color
Black and white are the identity colors. Neutral surfaces are from the website; historical crimson is not used. UI semantic success/error colors may be separately specified for accessibility. Copyable colors and tokens are in the public kit. CMYK/Pantone are not claimed without a printer/profile or physical proof.

## Typography
Existing marketing stack: TS Sans (local Helvetica Neue alias), Helvetica Neue, Inter Tight, system-ui. Bundled Inter Tight under SIL OFL; see dist/licenses/Inter-Tight-OFL.txt. New portable components use Inter Tight. Monospace uses native UI mono; Geist Mono and Noto Sans Tamil are candidates, not bundled or approved. Wordmark is vector, not a font. Recommended H1 42–96px, H2 32–64px, body 16–18px, captions 12–14px; responsive clamps, no fixed text containers.

## Layout and motion
Use the existing spacing/radius scale and cubic-bezier(.22,1,.36,1). Mobile-first responsive grids, no horizontal scroll, readable contrast, focus-visible, meaningful alt text, controls operable by keyboard. Use finite, non-blocking motion with reduced-motion support. Do not add heavy marketing intro to XR.

## Graphics
Use geometry-derived lines, four-piece motifs and monochrome fields; no unrelated stock mark. Photography: intentional lighting, restrained contrast, licensed imagery, no fabricated client outcomes. 3D: matte black/white materials and authentic geometry; actual GLB/BLEND, motion video and sonic identity remain future deliverables. Physical mockups are concepts, never evidence of produced merchandise.

## Governance
One source of truth, versioned exports, review PRs, local checks, independent backup and explicit Netlify approval. Public route does not expose repository secrets. Future products consume pinned exports; no independent redraw.
