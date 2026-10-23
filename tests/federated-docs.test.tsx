import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RepoMarkdown from "../app/components/RepoMarkdown";
import { resolveDocLink } from "../lib/doc-links";
import type { DocSource, RepoDocument } from "../lib/federated-docs";

const source: DocSource = { owner: "example", repo: "project", branch: "main", commit: "a".repeat(40), commitDate: "2026-01-01", topics: [], contentHash: "hash", syncedAt: "2026-01-01", documentCount: 2 };
const readme: RepoDocument = { repo: "project", path: "README.md", title: "Project", href: "/docs/project", body: "", section: "Overview" };
const guide: RepoDocument = { repo: "project", path: "docs/guide.md", title: "Guide", href: "/docs/project/docs/guide.md", body: "", section: "docs" };
const documents = [readme, guide];

test("relative docs, directory indexes, anchors and images resolve against the snapshot", () => {
  assert.equal(resolveDocLink("../README.md#install", guide, source, documents, [source]), "/docs/project#install");
  assert.equal(resolveDocLink("docs/guide.md", readme, source, documents, [source]), guide.href);
  assert.equal(resolveDocLink("../images/example.png", guide, source, documents, [source], true), `https://raw.githubusercontent.com/example/project/${source.commit}/images/example.png`);
  assert.equal(resolveDocLink("../src/app.go", guide, source, documents, [source]), `https://github.com/example/project/blob/${source.commit}/src/app.go`);
  assert.equal(resolveDocLink("#heading", guide, source, documents, [source]), "#heading");
});

test("absolute GitHub links become local only for the imported branch/revision", () => {
  assert.equal(resolveDocLink("https://github.com/example/project/blob/main/docs/guide.md#use", readme, source, documents, [source]), guide.href + "#use");
  assert.equal(resolveDocLink("https://github.com/example/project/blob/unpublished/docs/guide.md", readme, source, documents, [source]), "https://github.com/example/project/blob/unpublished/docs/guide.md");
});

test("unsafe protocols and traversal cannot become local or image URLs", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,hello", "../../outside.md", "%2e%2e/%2e%2e/outside.md", "docs/\\bad.md"]) {
    assert.equal(resolveDocLink(value, readme, source, documents, [source]), "");
  }
});

test("GFM, repeated anchors and code fences render without executing HTML or MDX", () => {
  const body = "# Same\n\n## Same\n\n| A | B |\n|---|---|\n| one | two |\n\n- [x] Done\n\n```go\nfmt.Println(1)\n```\n\n<script>globalThis.compromised=true</script>\n\n<img src=x onerror=alert(1)>\n\n[bad](javascript:alert(1))\n\n{globalThis.compromised=true}";
  const html = renderToStaticMarkup(<RepoMarkdown document={{ ...readme, body }} source={source} documents={documents} sources={[source]} />);
  assert.match(html, /id="same"/);
  assert.match(html, /id="same-1"/);
  assert.match(html, /<table>/);
  assert.match(html, /type="checkbox"/);
  assert.match(html, /language-go/);
  assert.doesNotMatch(html, /<script|onerror=|javascript:/);
  assert.equal((globalThis as Record<string, unknown>).compromised, undefined);
});
