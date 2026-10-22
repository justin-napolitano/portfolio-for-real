# Docs runtime prerequisite validation

- `npm run test:schema`: seven tests pass. 25 concurrent initialized-schema calls share three SELECT-only queries; successful result cached; unavailable/missing required schema/constraints fail closed without SQL detail disclosure; failures can retry; source guard asserts runtime db.ts contains no schema DDL.
- `npm run lint`: zero errors, one pre-existing unused ProjectCard import warning.
- `./node_modules/.bin/tsc --noEmit --incremental false`: passes.
- Exact prior Docs initializer body (including commit_logs) retained byte-for-byte after function rename in operator-only migration script; --apply required. No historical migration executed.
- Runtime readiness includes required posts/commit_logs columns with LIMIT0, validated single-column entry_slug unique constraint, named kind check, absence of obsolete body check, and validated commit_logs SHA primary key. No application rows fetched.
- Configured read-only metadata check/build deferred until root reviews concrete diff; no production schema/data mutation.

Separate prerequisite from MDX6 dependency PR #5 and brand PR #4. Requires focused runtime/schema review; no auth/data/filter/connection-setting or schema-definition changes. Keep previous deployment if readiness fails; do not restore render-time destructive migrations as workaround.
