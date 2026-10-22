# Read-only runtime schema prerequisite

Draft bounded plan: fix/read-only-schema-readiness (Docs), separate from the brand implementation.

Problem: runtime initDb drops/re-adds constraints/indexes during rendering. Parallel Next prerenders race even on an initialized database.

Scope: extract exact historical initializer into explicit operator-only schema migration command; replace runtime initDb with cached single-flight read-only schema readiness queries. Missing schema fails closed with an actionable generic migration instruction. Keep all existing callers and data/auth logic. The entries import command remains an import, not an implicit schema migration. No dependencies.

Tests: fake SQL client asserts only SELECTs, concurrent callers share readiness, failures retry, missing schema/constraints rejected, and real runtime initDb path has no DDL. No production migration or DB-mutating build. Inspect source and run type/lint checks offline, then optionally run read-only schema check. Parent reviews concrete diff before staging. Recovery: retain prior deployment if prerequisite fails; do not revert to destructive runtime initialization as an operational workaround.
