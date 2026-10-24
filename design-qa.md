# Project log and documentation standard verification — 2026-10-23

Final result: passed

Public scope: 215 repositories, all explicitly public in the generated inventory. Search, fork filters (9 forks), empty results, detail pages, Jayburd Books documentation links, missing-project 404, and private-project 404 passed browser checks at 320, 390, and 1440 pixels. No runtime errors or horizontal overflow were observed. The seven-source wiki snapshot has 440 documents. A 664-page production build passes.

Owner-local private scope: a separate 254-repository inventory and 172-document snapshot from five explicitly chosen private technical sources stay outside the public repository. The static export renders source navigation and full-text search. Browser checks passed search/navigation, mobile layout, no remote images, no-store search responses, and denial of a foreign Host header. The server binds only 127.0.0.1. This is not hosted authentication; a hosted private release remains pending the owner's identity choice.

Sixteen Python tests and five TypeScript tests pass, including public/private output isolation, archive credential redirect handling, source opt-outs, pagination, lifecycle validation, idempotence, deletions, unsafe links, and inert Markdown/MDX. Both catalog checks and type checking pass. Targeted lint has no errors and the existing remote Markdown image warning. Next-only rules are scoped away from the standalone HTML exporter because it does not run within Next.js.

The documentation standard and templates live in this repository and are imported by the first post-merge source sync. Other repositories remain usable without a manifest. No lifecycle status is inferred from commit activity. Private content has not been uploaded to public hosting or committed to Git.

Evidence is retained in the local project-log-evidence directory. Public deployment and post-merge sync results are recorded there after rollout; this QA report does not claim they have already happened.


## 2026-10-23: Shared midpoint palette

Final result: passed

Apply midpoint red (#d01527) to text accents, hover/focus/selection states, keeping green (#356349) exclusively as the native scroll canvas behind a full-height paper page surface. Screen-only overrides preserve print styling and published PDF files. Existing dark modes retain readable contrast with a lighter red text variant. No application data, destinations, authentication, or runtime dependencies changed.

The production build/static checks pass using the repository lockfile. Browser checks at 320, 390, and 1440 pixels verify palette tokens, green root/body canvas, paper surface without exposed green bands, selection color, and no page overflow or runtime exceptions. Screenshots were inspected. Existing dark modes also pass. The news reader includes narrow-screen wrapping for article controls/text found during this review; hiring CTA text retains sufficient contrast on red.

Local build/browser evidence is retained outside this repo in the rollout directory. Production status and screenshots are recorded after release; this local QA result does not assert production has already changed.
