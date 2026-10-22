# Runtime readiness and operator migrations

Page renders, API handlers and content-import scripts call `initDb`, which performs only SELECTs: posts and commit_logs required-column resolution using `LIMIT 0` and catalog checks for a validated single-column unique entry_slug constraint, validated named kind check, absence of the obsolete body-length constraint, and validated commit_logs SHA primary key. It does not fetch any application rows. Successful readiness is cached per process; concurrent calls share one promise; failures reset for retry. Missing schema fails closed and does not auto-migrate.

Use `npm run db:check` to check a configured environment read-only. Keep environment files ignored and private.

Historical schema setup now lives solely in `scripts/migrate-schema.ts`. `npm run db:migrate:schema` makes no changes and exits with an instruction. Only `npm run db:migrate:schema -- --apply` executes the historical migration. **Do not run it as a build/deploy/postinstall hook or while serving traffic.** It retains the old DROP/ADD constraint/index sequence for explicit operator review; it has not been executed for this change. New/old databases requiring migration need a coordinated maintenance window, backup, reviewed schema diff, recovery plan and verification before runtime deployment. Existing entries imports require ready schema and never implicitly run this migration.

No authentication, publishing filters, data updates, kind values, uniqueness contract, connection settings or schema definitions are changed by the runtime prerequisite. SQL errors and connection details are not echoed by the readiness failure.

Scope limit: checks establish required column/constraint availability; they are not a complete schema drift or security audit. The old explicit migration remains an operator-owned maintenance task.
