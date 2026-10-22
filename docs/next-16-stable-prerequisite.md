# Supported Next 16 prerequisite — 2026-10-22

This bounded prerequisite pins Next and eslint-config-next to16.4.1 and React/ReactDOM to19.2.9 in the existing19.2minor, with generated lockfile. No framework-major migration, new integration, application feature, access-control, data or schema change. No migration scripts or account writes executed.

Authority: [official Next October14security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026), [support policy](https://nextjs.org/support-policy), [React upstream RSC advisory](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3) and [Server Functions advisory](https://github.com/react/react/security/advisories/GHSA-h3gv-c5rc-p453). Registry metadata confirms exact Next16.4.1/eslint-config-next16.4.1 peer compatibility and React19.2.9 availability. Current Next16ActiveLTS supports the selected versions; no canary feature required.

Default local Turbopack build failed its PostCSS helper port/process binding with OS error1, including the escalated retry. Validation uses officially supported `npm run build -- --webpack`; existing production build script/config unchanged. Vercel's own default production build and security gate must independently pass before publication. No browser or PDF verification performed; visual release gate remains pending.

No Next/React advisory remains in npm audit. Remaining audit findings are recorded below rather than claiming complete dependency remediation. No audit fix, override or suppression added; unrelated locked transitive versions preserved. Pinned eslint16.4.1 remains transitively flagged by existing lint-tool dependencies, so development audit is not clear. Rollback reverts the focused prerequisite commit; no data recovery required. Parent review required before integration into approved brand branch; no deployment/main merge.

## Docs evidence

Base3cb7375. Empty next.config retained. Required one-line type compatibility change: dynamic article page ParamsProps now accepts promised params, matching stable Next generated PageProps; existing async resolver and article behavior unchanged. No article or DB/auth code changed.

SELECT-only `npm run db:check` passed before configured build; ignored environment copied with mode600, never committed. `npm run test:schema`:7pass. `node --test tests/mdx-compatibility.test.mjs`:4pass including all197tracked articles offline. `npm run lint`:exit0,1existing unusedProjectCardwarning. `npx tsc --noEmit`:pass. Supported webpack production build:207pages. HTTP index/archive/article200, unknownarticle404, missingintegrationkey401; no authenticated writes.

Audit17total(5moderate12high); omit-dev6(3moderate3high):argparse,js-yaml,source-map-js,sprintf-js,ws,yaml. Every flagged underlying resolution unchanged from base; only eslint root/plugin versions changed within existing flagged chains. Risk examples:ws belongs to existing Postgres transport; YAML parsers belong to existing Markdown/frontmatter/tooling; source-map-js belongs to existing CSS toolchain. This prerequisite does not establish exploitability or remediate those independent findings.
