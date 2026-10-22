import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createSchemaInitializer } from "../lib/schema-readiness";

const ready = { unique_slug: true, kind_check: true, full_body_ready: true, commit_sha_key: true };

test("concurrent initialized-schema renders issue only read-only metadata queries", async () => {
  const statements: string[] = [];
  const initDb = createSchemaInitializer(async (query) => {
    statements.push(query);
    await new Promise((resolve) => setTimeout(resolve, 2));
    return { rows: [ready] };
  });
  await Promise.all(Array.from({ length: 25 }, () => initDb()));
  await initDb();
  assert.equal(statements.length, 3);
  for (const query of statements) {
    assert.match(query.trim(), /^SELECT\b/i);
    assert.doesNotMatch(query, /\b(DROP|ALTER|CREATE|INSERT|UPDATE|DELETE)\b/i);
  }
  assert.match(statements[0], /LIMIT 0/);
});

test("unavailable schema fails closed without leaking SQL details, then retries", async () => {
  let failed = true;
  const initDb = createSchemaInitializer(async () => {
    if (failed) throw new Error("sensitive-connection-detail");
    return { rows: [ready] };
  });
  await assert.rejects(initDb(), (error: Error) => {
    assert.match(error.message, /explicit db:migrate:schema/);
    assert.doesNotMatch(error.message, /sensitive-connection-detail/);
    return true;
  });
  failed = false;
  await initDb();
});

for (const field of Object.keys(ready)) {
  test(`missing required ${field} rejects without migrating`, async () => {
    const statements: string[] = [];
    const initDb = createSchemaInitializer(async (query) => {
      statements.push(query);
      return { rows: [{ ...ready, [field]: false }] };
    });
    await assert.rejects(initDb(), /schema is not ready/);
    assert.equal(statements.length, 3);
    statements.forEach((query) => assert.match(query.trim(), /^SELECT\b/i));
  });
}

test("runtime db module cannot run historical schema DDL", () => {
  const source = readFileSync(new URL("../lib/db.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /\b(?:CREATE TABLE|ALTER TABLE|DROP INDEX|CREATE INDEX)\b/);
  assert.match(source, /export const initDb = createSchemaInitializer/);
});
