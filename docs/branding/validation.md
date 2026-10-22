# Validation

`npm run lint` exits zero with one existing unused ProjectCard warning. Initial build lacked POSTGRES_URL; after pulling the existing configured environment into an ignored mode-600 local file, `npm run build` passes and generates 207 pages including the actual article archive. Actual active domain is docs.jnap.me. Real article/index/commit-log data paths remain unchanged.

Visual/reflow/keyboard/zoom verification is blocked pending approved browser access. See design-qa.md. No deployment or merge performed; parent coordinates actual project env, staged URL and final gates. Rollback by reverting the presentation commit.

After parent reviewed separate prerequisite PRs #5/#6, integrated read-only runtime (ab41e75) and supported MDX6 (06339e7). `npm run db:check` passed first using SELECT-only metadata. Seven schema regressions and four MDX smoke tests passed, including all197 tracked Markdown articles offline. Read-only metadata inspection confirmed the existing validated kind check mentions all six required kinds. Combined configured production build PASSES207pages. Historical migration was never executed. Source is ready for staging security gate recheck; visual/browser QA remains pending.
