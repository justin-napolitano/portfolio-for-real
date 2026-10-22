# MDX6 prerequisite validation

- Pinned next-mdx-remote exactly 6.0.0. Lock version changes limited to it and required unist-util-remove/visit/visit-parents dependencies; Next/React versions untouched. npm also refreshes peer metadata/deduplication. No package script/API/security-setting changes.
- `node --test tests/mdx-compatibility.test.mjs`: four tests pass. Rich headings/emphasis/list/link/static JSX/image alt attributes and Python highlighting render; JS expression suppression remains enabled by upstream defaults; real public RSS article retains content; all 197 tracked Markdown articles compile/render offline using the production rehype plugin. No database used.
- `npm run lint`: exits zero with existing unused ProjectCard import warning.
- `./node_modules/.bin/tsc --noEmit --incremental false`: passes.
- No configured production build run for this dependency-only prerequisite because inspection found active Docs also has historical render-time DROP/ADD constraint code. Parent must review the separate read-only readiness prerequisite before next database-backed build/stage.

Primary authority: [HashiCorp v6.0.0 release](https://github.com/hashicorp/next-mdx-remote/releases/tag/v6.0.0), [versioned README](https://github.com/hashicorp/next-mdx-remote/blob/v6.0.0/README.md). RSC source/options API remains supported; both new JS-blocking defaults remain enabled. Dependency/security gate review is required; Vercel gate was not bypassed.

Existing package audit reported other dependency findings; broad stack remediation is outside this minimal version prerequisite. Do not interpret passing compatibility checks as a full security audit.
