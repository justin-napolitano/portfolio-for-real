# Federated documentation

## Source of truth

`public repository → pinned GitHub revision → validated catalog → static pages and search → Vercel`

Sources are declared in `docs-sources.json`. Repository Markdown is canonical; the catalog is a generated publication artifact. Each page identifies its source path, immutable revision, sync date, and source edit link. Navigation groups documents by repository and folder. Full-text search supports repository and topic filters.

The workflow runs every six hours and supports manual dispatch. It checks repository identity and public visibility, pins the default branch revision, and atomically replaces the catalog after all available sources succeed. Removed files disappear on the next refresh. Private or missing repositories are withdrawn. Other fetch errors fail the job and preserve the previous complete snapshot. Published content may remain in Git history and deployment archives after withdrawal.

Content hashes suppress commits for unrelated code changes. Unchanged documentation retains its previous pinned revision. Self-ingestion does not create an endless cycle of sync commits.

## Rendering contract

Markdown supports GFM tables, task lists, fenced code, and stable heading anchors. Relative document links resolve locally where imported; other links point to pinned GitHub sources. Relative images use pinned raw GitHub URLs. Search indexes the same public snapshot.

Raw HTML is skipped. MDX expressions and components never execute. Custom layouts, components, and generated API references require conversion in the owning repository. This importer does not copy whole websites or run source build commands.

## Trust boundaries

Repository content is untrusted. The importer never extracts archives, follows symlinks, executes scripts, or evaluates YAML/MDX. It permits bounded regular Markdown files at approved paths and caps compressed bytes, expanded bytes, members, document size, count, and total text. Traversal paths and unsafe link protocols are rejected. The renderer escapes Markdown and skips raw HTML. Remote images expose ordinary request metadata to their host and are not proxied into this origin.

Only explicitly listed public repositories publish. Private selected-projects and burdlytics_boilerplate are excluded. The token is sent only to GitHub's API. Readers need no credentials; there is no public write endpoint. Actions use pinned revisions. Only the sync job has write permission; it stages only the catalog and pushes normally without bypassing protection.

## Operations and recovery

Add or remove a source through a reviewed config change; changes on main trigger sync. On failure, inspect Actions, correct the source/config, and rerun. The last complete snapshot remains usable. If branch protection prevents a push, use the repository-approved PR path rather than bypassing protection.

Correct publishing mistakes in the source, rerun sync, and verify deployment. For urgent withdrawal, remove the source from config and regenerate. A refresh cannot make published history secret. Revert a rendering change or restore the previous Vercel deployment for rollback; correct source mistakes before the next sync.

After rollout verify workflow dispatch, generated commit, deployment readiness, search index, and a source page. A successful sync alone does not prove deployment.

## Verification

Python tests cover archive boundaries, publication opt-outs, visibility, deletions, idempotence, and atomic recovery. TypeScript tests cover links, images, anchors, code, GFM, and inert HTML/MDX. CI validates catalog, types, and production build. Browser checks cover search/filter/retry, navigation, provenance, missing pages, and narrow layouts.

References: [react-markdown](https://github.com/remarkjs/react-markdown), [GFM](https://github.com/remarkjs/remark-gfm), [workflow permissions](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).
