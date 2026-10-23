# Project documentation standard

Every repository can appear in the project log, even before it adopts this format. The log uses GitHub metadata as a fallback and labels missing lifecycle information as **not yet documented**. A recent push does not mean a project is active or complete.

## Small required core

Keep the canonical files in the owning repository:

```text
project.json                 Project identity and reading order
README.md                    Purpose, current state, quick start, doc links
```

Use the [project manifest template](templates/project.json) and [README template](templates/README.md). The schema lives in `schemas/project.schema.json` in the wiki repository. The manifest is plain JSON rather than a second narrative document. It contains a version, title, short summary, explicit lifecycle status, optional topics, and paths to existing documentation. It must not contain secrets, deployment credentials, or copies of operational data.

Supported statuses: `idea`, `in-progress`, `maintained`, `paused`, `complete`, and `archived`. Owners choose the lifecycle state; GitHub's archive flag takes precedence. Forks remain identifiable.

## Add detail when it helps

```text
docs/index.md                Reading guide for a larger project
docs/architecture.md         Components, boundaries, data flow, tradeoffs
docs/setup.md                Prerequisites, configuration names, run/test commands
docs/operations.md           Deploy, observe, recover, troubleshoot
docs/decisions/               Numbered architectural decisions
docs/changelog.md            Meaningful changes and evidence links
```

These are roles, not mandatory filenames. Existing projects can map their current layout through the manifest's `docs` object. For example, Jayburd Books already uses `docs/decisions/0001-architecture.md`, `docs/delivery.md`, and `docs/runbooks/`; those files can stay where they are. Small scripts do not need six empty documents.

Link to executable contracts, tests, issues, and releases. Describe what is implemented, what has been verified, and what remains unavailable. Avoid duplicating issue status or generating a prose claim from commit volume. GitHub history supplies the full development log; a changelog highlights meaningful milestones.

## Publishing and privacy

The public project log enumerates public repositories automatically. It never includes private repository metadata. Wiki document ingestion remains an explicit allowlist in `docs-sources.json`. Adding a project to the log does not automatically publish all its documents.

The importer respects supported private/draft frontmatter and path exclusions. Raw HTML and executable MDX are omitted. Private inventories and documentation must remain outside this public Git repository and public search index. Publish selected private-project descriptions only through a deliberate public source; a private repository is not a publication approval.

## Validation and adoption

Run `python3 scripts/sync-projects.py` to refresh the public log, then `npm run projects:check`. A malformed manifest fails the refresh and keeps the previous catalog. Optional manifest files are bounded, validated, and fetched from each repository's default branch. Without a manifest, the repository still appears with its source description and an unreported lifecycle.

Adopt gradually: write an honest README, add the manifest, then fill the architecture/setup/operations gaps that matter for that project. Update the source repository and let federation carry the change to the wiki.

The wiki repository omits its own push timestamp from the generated inventory so publishing commits cannot create an endless refresh cycle. All other repository push dates come directly from GitHub.
