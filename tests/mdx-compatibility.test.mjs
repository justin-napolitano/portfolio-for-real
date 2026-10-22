import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import matter from "gray-matter";

const options = { mdxOptions: { rehypePlugins: [rehypeHighlight] } };

test("article RSC rendering retains rich Markdown, static JSX and highlighted code", async () => {
  const source = ["# Field guide", "", "An **important** note with [reference](/projects).", "", "- First step", "- Second step", "", "```python", "def inspect():", "    return 42", "```", "", '<aside title="Details">Architecture context</aside>', "", '<img src="/diagram.svg" alt="Architecture flow" />'].join("\n");
  const html = renderToStaticMarkup(await MDXRemote({ source, options }));
  assert.match(html, /<h1>Field guide<\/h1>/);
  assert.match(html, /<strong>important<\/strong>/);
  assert.match(html, /href="\/projects"/);
  assert.match(html, /<li>First step<\/li>/);
  assert.match(html, /language-python/);
  assert.match(html, /hljs-keyword/);
  assert.match(html, /Architecture context/);
  assert.match(html, /alt="Architecture flow"/);
});

test("upstream defaults suppress MDX JavaScript expressions", async () => {
  const html = renderToStaticMarkup(await MDXRemote({ source: "Before {2 + 2} after", options }));
  assert.match(html, /Before/);
  assert.match(html, /after/);
  assert.doesNotMatch(html, /4/);
});

test("real tracked public article retains its feature list and architecture links", async () => {
  const file = readFileSync(new URL("../content/entries/github-python-rss-reader/index.md", import.meta.url), "utf8");
  const html = renderToStaticMarkup(await MDXRemote({ source: matter(file).content, options }));
  assert.match(html, /Features/);
  assert.match(html, /Parses RSS feeds/);
  assert.match(html, /Docker/);
  assert.match(html, /<li>/);
});


test("all tracked Markdown articles compile and render offline with the production rehype plugin", async () => {
  const root = new URL("../content/entries/", import.meta.url);
  const files = readdirSync(root, { recursive: true }).filter((file) => file.endsWith(".md"));
  assert.ok(files.length > 0);
  for (const file of files) {
    const body = matter(readFileSync(new URL(file, root), "utf8")).content;
    const html = renderToStaticMarkup(await MDXRemote({ source: body, options }));
    assert.ok(html.length > 0, `${file} rendered no content`);
  }
  console.log(`Rendered ${files.length} tracked articles offline; no database used.`);
});
