# Brand design QA — docs

final result: passed

## Findings and comparison history

P2: decorative stat/callout frames conflicted with the approved quiet document hierarchy. Removed those frames while preserving metrics, article content and collection structure.

Initial browser review: 2026-10-22T19:01:27Z, blocked for the P2 findings above. Revised review: 19:09Z; final source capture: 19:15Z. The final combined source/implementation image was opened and compared visually after fixes. No actionable P0/P1/P2 remains within this brand implementation review. This is not a comprehensive accessibility or security audit.

## Visual truth and normalization

Source visual truth: `/Users/justin/repos/brand-review/2026-10-22/08-index-simplified-no-marks.png` (1448×1086px board). Rendered source: `f8490d1`. Local URL: `http://127.0.0.1:4423/`. State: public, light theme, actual application content. The board is a family art direction containing several compact surfaces; the real application retains its content density and features. It is not treated as a pixel-identical page specification.

Full-view comparison: [docs/branding/qa/after-comparison.png](docs/branding/qa/after-comparison.png); earlier blocked comparison: [before](docs/branding/qa/before-comparison.png). Both artifacts are in the same comparison image at700px column width, scaled proportionally. Implementation desktop crop is1440×900 CSS/pixels atDSF1. Focused typography/navigation inspection uses the full-resolution [desktop crop](docs/branding/qa/desktop-top.png), computed-font evidence and390px capture; no separate region composite was needed because the entire top viewport is readable in the full-resolution crop.

## Required fidelity surfaces

- Fonts: local Inter provides compact sans navigation/interface text. Source Serif4 is retained for reading headings where applicable; sans-only lists/feeds and functional dashboard headings are intentional. Modest22px identity, no leading title icon/character, and no giant hero. Font loading and wrapping were inspected visually and through computed styles.
- Spacing/layout: warm open page, fine rules and restrained hierarchy match the board. Actual long descriptions, feed entries, docs collections and functional data grouping remain. No clipping or document overflow at320,390,768,1440px. Functional dashboard KPI cards/chart are intentionally retained.
- Color: ink/paper/stone base and small slate accents; no blue page wash. Existing semantic status/chart colors remain meaningful. Focus treatment is visible; muted text and controls were checked in rendered views.
- Image/assets: no added decorative photography or title mark. Existing public media remains authentic, without ornamental framing. Photos use existing author captions as alternatives with fallback; no invented image descriptions. Existing functional charts/icons are preserved.
- Copy/content: actual routes, records, article bodies, feed content, metrics, integrations and product names remain. The approved board's short sample labels do not replace application content. No implementation instructions appear as product copy.

## Browser verification and evidence

User explicitly approved Chromium/Playwright fallback. Guarded runners used `JNAP_MANUAL_BROWSER_ALLOW=1` and `--manual-allow-browser`. Browser-rendered evidence: [390px](docs/branding/qa/render-390.png), [768px](docs/branding/qa/render-768.png), [1440px](docs/branding/qa/render-1440.png), [320px](docs/branding/qa/render-320.png), [machine evidence](docs/branding/qa/browser-evidence.json).

Keyboard focus, public navigation and console/page errors checked: no captured console errors or page errors. Index, Archive and actual MDX article navigation pass. Article body renders at390/320 with no document overflow.

200% effective reflow: [capture](docs/branding/qa/effective-200-percent.png),720×450 CSS viewport with deviceScaleFactor2 (1440×900 physical pixels), no document overflow. Headless keyboard zoom did not change viewport/DPR; this is an explicit effective CSS/DSF emulation, not a claim of native browser-UI zoom testing. Native UI zoom is a remaining manual coverage limitation.

npm run build -- --webpack: passed, 207 routes. Configured DB readiness is read-only; no migrations executed. Synthetic login changes cookies only; no content or financial/integration writes were performed.

## Implementation checklist

- [x] Compare approved source and render together.
- [x] Fix earlier P2 findings and recapture same state.
- [x] Review typography, spacing, colors, media and actual copy.
- [x] Verify responsive sizes, focus and core public/auth boundaries.
- [x] Production build and durable screenshot evidence.

## Follow-up polish

P3: native browser-UI zoom can be checked manually beyond the recorded effective200% reflow. No further cosmetic expansion is required for this rollout.

## 2026-10-22 scoped follow-up — native canvas

final result: passed

User explicitly corrected gray overscroll to green. Native html/bodycanvas and theme-color now#356349. Real fullwidth .brand-document wrapper retains existing#F4F0E8 paper. min-height100svh; overscroll-behavior:auto. No JS animation, fake bounce, scroll locking or blanket page recolor.

Source truth is the user’s latest explicit refinement plus the previously approved08 Index/Simplified board. Fresh live1440px/390px production screenshots captured by coordinator serve as the before baseline. Scoped rendered implementation was compared alongside the actual before image in one combined PNG and inspected at390px. Both desktop inputs have1440CSSpx width atDSF1; comparison columns normalize to700px width and crop the top region. Full-resolution desktop/mobile files retain text for focused reading. Existing content is retained rather than substituting board sample copy.

Evidence: `docs/branding/overscroll-qa/comparison.png`, `render-390.png`, `render-768.png`, `render-1440.png`, `render-320.png`, `render-720.png`, `desktop-top.png`, `checks.json`. Public light state. Approved Chromium fallback used.320/390/768/1440/720CSSpx all have document width equal viewport, no page/console errors.720px is a narrow reflow check, not a native200%zoom claim.

Required fidelity surfaces: Inter/SourceSerif families and modest hierarchy preserved; typography checked visually plus computed styles. Spacing/rules retain the simple Index rhythm. Colors checked via actual computed styles. No media/assets/icons added or replaced; real diagrams/content/media and sharp local fonts remain. Copy/project records/routes retained. No leading title character. No P0/P1/P2 findings remain within this bounded follow-up.

Read-only db:check passed before webpack production build;207pages built. Archive navigation passed, scrollY300 reached with native ordinary scroll. No runtime/auth/schema/dependency/content changes or migration commands.

Docs native root/body now rgb(53,99,73), surface rgb(244,240,232), theme#356349; existing visible page presentation stays intact. Chromium computed backgrounds/scrolling do not prove native macOS/Safari elastic overscroll. That platform behavior remains an explicit manual test limitation; no fake bounce or warning masking was used.

Checklist: scoped source change complete; actual build complete; responsive/computed-state checks complete; combined visual comparison complete; deployment held for coordinator review.
