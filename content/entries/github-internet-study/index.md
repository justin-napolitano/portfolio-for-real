---
slug: github-internet-study
id: github-internet-study
title: Docker Compose Setup for Ingesting Hacker News into Postgres
repo: justin-napolitano/internet-study
githubUrl: 'https://github.com/justin-napolitano/internet-study'
generatedAt: '2025-11-24T21:35:14.675Z'
source: github-auto
summary: >-
  Set up a Docker Compose environment to ingest Hacker News data into Postgres
  and apply SQL transformations for data processing.
tags:
  - docker
  - postgres
  - sql
  - python
  - docker-compose
seoPrimaryKeyword: hacker news postgres ingestion
seoSecondaryKeywords:
  - docker compose tutorial
  - sql upsert example
  - data pipeline setup
  - python data ingestion
  - postgres data transformation
seoOptimized: true
topicFamily: datascience
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

This is a minimal, production-leaning starter you can `docker compose up` to ingest **Hacker News** into Postgres (raw), then run a SQL upsert to a canonical **tech** staging table, and build a basic velocity mart.

## What's included
- **apps/tech**: Python ingestion job (Hacker News) — one niche worker
- **libs/**: shared persistence + HTTP client utilities
- **sql/**: DDL + transforms (Bronze→Silver→Gold)
- **runner/**: simple SQL runner to apply transforms in order
- **docker-compose**: Postgres + Adminer + Tech worker + SQL runner
- **.env.example**: env vars for Postgres connection

## Quick start
```bash
cp .env.example .env
docker compose up --build
```
Then open Adminer at http://localhost:8080 (system: PostgreSQL, server: db, user: postgres, pass: postgres, db: trends)

### Apply transforms
The `runner` container will auto-run SQL in `/sql` on startup. You can re-run:
```bash
docker compose run --rm runner python /app/runner.py
```

### Next steps
- Add more sources (Reddit, GitHub Trending) to `apps/tech/main.py`.
- Create `apps/finance` and `sql/silver/stg_trend_items_finance.sql` with same pattern.
- Decide on dbt vs. custom runner (dbt Core recommended once models grow).

---

**Note:** The ingestion job respects idempotency via unique payload hashes and upserts by `id` and `(source,url)`. Tune polling cadence in `apps/tech/config.yaml`.



