# Repository documentation wiki

The public documentation at https://docs.jnap.me is a reading layer over repository-owned Markdown. Edit the original file using **Edit source** on any page; do not edit the generated catalog.

## Publish documentation

1. Write a root `README.md` or Markdown/MDX file under `docs/` in a public repository.
2. Add the repository to `docs-sources.json` if it is not already listed. Review its publishing scope first.
3. Merge source changes. Sync checks every six hours, or run **Actions → Sync repository documentation → Run workflow**. GitHub schedules can be delayed.
4. A changed snapshot is committed to `data/federated/catalog.json`; the connected Vercel project builds that commit.

Frontmatter `draft: true`, `private: true`, `publish: false`, or `visibility: internal` prevents publication. Planning, governance, branding, and review evidence paths are excluded; see `scripts/sync-docs.py` for exact rules. Never rely on publication exclusions to make a public repository confidential.

## Development

```sh
npm ci
npm run docs:sync
npm run docs:check
npm run docs:test
npx tsc --noEmit
npm run build -- --webpack
npm run dev
```

Python 3.12 and Node 22 match CI. Sync uses the Python standard library. `GITHUB_TOKEN` is optional locally for public API rate limits; Actions uses its built-in token. The wiki builds and searches from the committed snapshot without a database or credentials.

See [federation and recovery](docs/federated-documentation.md). Legacy database-backed project detail URLs remain as a marked archive; `/projects` redirects to the wiki. Old commit-log integrations are retained for compatibility and do not supply wiki content.
