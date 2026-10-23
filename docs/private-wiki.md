# Private wiki preview and hosting boundary

The public wiki and private wiki use separate snapshots. Private inventory and Markdown never belong in this public repository, its generated catalog, its search index, its screenshots, or its CI artifacts.

## Owner-local workflow

Authenticate to GitHub as the repository owner. Supply `GITHUB_TOKEN` through the environment; never put a token in a command argument, source file, or manifest. A private source manifest uses the same shape as `docs-sources.json` and stays outside this repository.

```sh
python3 scripts/sync-projects.py --audience private --output /absolute/private-workspace/private-projects.json
python3 scripts/sync-docs.py --private --config /absolute/private-workspace/private-sources.json --output /absolute/private-workspace/private-docs.json
npx tsx scripts/render-private-wiki.tsx /absolute/private-workspace /absolute/private-wiki-output
python3 scripts/serve-private-wiki.py /absolute/private-wiki-output --port 4804
```

Open `http://127.0.0.1:4804`. This is an owner-local preview, not hosted authentication. The server binds only loopback, validates the Host header against local names, disables directory listing, blocks remote assets, prevents framing, and sends no-store responses. Local processes/users with access to the workstation are within this preview's trust boundary. Stop it with Ctrl+C. The generated files remain on disk until the owner removes them.

The private inventory includes all owned repositories; the private document source list remains explicit. The preview supports full-text search, repository navigation, source revision links, GFM, code, and local document links. Remote images are omitted to avoid disclosing private page paths or triggering external requests.

## Hosted deployment requirements

No private content is automatically uploaded. A hosted private wiki needs an access decision and verified protection covering every HTML page, search JSON, generated asset, preview URL, production alias, and deployment URL. It must have separate storage and deployment ownership from the public wiki. `noindex` is metadata, not authorization.

Two supported architectural choices are a dedicated GitHub sign-in with an owner allowlist or a separate Vercel project protected by the owner's existing Vercel login on **all deployments**. The local preview does not substitute for either. Verify anonymous denial, owner access, logout, and public-index exclusion before uploading private data. Do not add a broad GitHub credential to a hosting environment to avoid configuration work.

## Trust review

| Threat | Risk | Control / remaining boundary |
|---|---|---|
| Private snapshot committed publicly | High | Private sync/export rejects paths inside the public repository; public loaders reject private audience; no upload step |
| Archive redirect sends a GitHub token elsewhere | High | Allow only HTTPS GitHub archive hosts; strip Authorization on redirects; token stays in memory |
| Source Markdown executes code | High | Stream bounded regular files; skip raw HTML; never evaluate MDX; escape rendered content |
| Private content exposed through local network | High | Loopback binding, local Host allowlist, no directory listing; workstation access is trusted |
| Remote tracking from private docs | Medium | Private renderer omits images; CSP restricts resources to the local origin |
| Hosting protection misses JSON or aliases | High | Hosted release remains pending verified all-route protection and the owner's identity choice |
| Drift between source and preview | Medium | Explicit refresh commands, pinned source revisions; generated output is never an authoring source |

This is a personal project. No enterprise AppSec approval is claimed. Hosted identity/data-access changes require owner review of a concrete implementation and access checks before release.
