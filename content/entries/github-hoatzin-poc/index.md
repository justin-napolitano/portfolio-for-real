---
slug: github-hoatzin-poc
id: github-hoatzin-poc
title: 'Hoatzin PoC: FastAPI, Next.js, and MkDocs Setup'
repo: justin-napolitano/hoatzin-poc
githubUrl: 'https://github.com/justin-napolitano/hoatzin-poc'
generatedAt: '2025-11-24T21:35:03.338Z'
source: github-auto
summary: >-
  A straightforward guide to setting up Hoatzin's backend, frontend, and
  documentation using FastAPI, Next.js, and MkDocs.
tags:
  - fastapi
  - postgres
  - next.js
  - docker
  - mkdocs
  - tailwind
  - typescript
seoPrimaryKeyword: hoatzin poc setup
seoSecondaryKeywords:
  - fastapi postgres docker
  - next.js setup
  - mkdocs documentation
  - typescript frontend
  - caddy configuration
seoOptimized: true
topicFamily: devtools
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

This archive contains three top-level projects:

- `hoatzin-backend` – FastAPI + Postgres backend (includes infra and Caddy).
- `hoatzin-frontend` – Next.js + TypeScript + Tailwind frontend.
- `hoatzin-docs` – MkDocs Material documentation site.

You can push each of these directories to its own GitHub repo if you want:

- `hoatzin-backend` -> `hoatzin-backend` repo
- `hoatzin-frontend` -> `hoatzin-frontend` repo
- `hoatzin-docs` -> `hoatzin-docs` repo

## High-level startup

### 1. Backend (API + DB + Caddy)

From `hoatzin-backend`:

1. Copy `.env.example` to `.env` and set secrets.
2. Start Postgres + API + Caddy via Docker:

   ```bash
   docker compose up --build
   ```

3. Run migrations (inside a shell with Python deps installed or inside the api container):

   ```bash
   alembic upgrade head
   ```

4. API should be reachable at `http://localhost:8000` (or via Caddy with your domain later).

### 2. Frontend (Next.js)

From `hoatzin-frontend`:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the UI.

### 3. Docs

From `hoatzin-docs`:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Open `http://127.0.0.1:8000` for the docs.

## License

All rights reserved. Personal project, not for redistribution.


