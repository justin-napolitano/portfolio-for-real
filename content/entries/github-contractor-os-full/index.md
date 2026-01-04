---
slug: github-contractor-os-full
id: github-contractor-os-full
title: 'Contractor OS: A Monorepo for Scheduling and Inventory'
repo: justin-napolitano/contractor-os-full
githubUrl: 'https://github.com/justin-napolitano/contractor-os-full'
generatedAt: '2025-11-24T21:34:17.457Z'
source: github-auto
summary: >-
  Explore a monorepo designed for small-to-midsize contractors, featuring
  FastAPI, Postgres, and an orchestrator for task management.
tags:
  - fastapi
  - postgres
  - docker
  - turborepo
  - typescript
  - openapi
  - sdk
  - orchestrator
  - docker-compose
seoPrimaryKeyword: contractor os monorepo
seoSecondaryKeywords:
  - scheduling platform
  - inventory management
  - docker local development
  - api orchestration
  - typescript sdk generation
seoOptimized: true
topicFamily: automation
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

A monorepo for a scheduling, task, and inventory platform for small-to-midsize contractors — built fast, agent-first, and designed to scale.

**Hybrid of Option C (Turborepo monorepo) + Option D (orchestrator & policies).**

---

## ✨ What you get
- **API (FastAPI + Postgres)**: jobs, customers, inventory, purchase orders (minimal).
- **Orchestrator (agents)**: function-calling router with guardrails and confirmations.
- **Contracts**: OpenAPI + JSON Schemas (tools + structured outputs).
- **SDK**: generated TypeScript client from OpenAPI.
- **Workers**: background jobs (low-stock scan, nightly PO drafts).
- **Infra**: docker-compose for local dev (Postgres, API, Orchestrator, pgAdmin).
- **Seed data** + **smoke test** that runs an end-to-end flow
  (schedule → assign → reserve → low-stock check).

---

## 📁 Repo layout
```
contractor-os/
├─ turbo.json                 # Turborepo pipelines
├─ package.json               # workspace scripts
│
├─ apps/
│  ├─ api/                    # FastAPI service (Dockerized)
│  ├─ web/                    # Next.js owner/portal (later)
│  ├─ mobile/                 # React Native crew app (later)
│  └─ worker/                 # Python worker for events/cron
│
├─ services/
│  └─ orchestrator/           # Agent router, guardrails, memory
│
├─ packages/
│  ├─ sdk/                    # Generated TS client
│  ├─ schemas/                # JSON Schemas (tools + outputs)
│  ├─ bot-runtime/            # Tool-calling helpers
│  ├─ design/                 # UI tokens/Tailwind (for web/mobile)
│  └─ config/                 # eslint, tsconfig, prettier
│
├─ contracts/
│  ├─ openapi.yaml            # API contract → generates packages/sdk
│  ├─ tools.schema.json       # LLM tool-call contracts
│  └─ structured-outputs/     # JSON Schemas for validated outputs
│
├─ policies/
│  ├─ risk-levels.md          # Confirmation matrix
│  ├─ prompts/                # Agent instruction sets
│  └─ redlines.md             # Forbidden actions, escalation
│
├─ db/
│  ├─ schema.sql              # Core schema
│  ├─ seed.sql                # Demo data
│  └─ migrations/             # Alembic (optional initially)
│
├─ infra/
│  ├─ docker-compose.yml      # Postgres, API, Orchestrator, pgAdmin
│  ├─ Dockerfile.api
│  ├─ Dockerfile.orchestrator
│  ├─ Dockerfile.worker
│  ├─ k8s/                    # (later)
│  └─ terraform/              # (later)
│
├─ scripts/
│  ├─ dev-up.sh               # compose up + healthchecks
│  ├─ db-reset.sh             # drop/create/migrate/seed
│  ├─ codegen-sdk.ts          # OpenAPI → /packages/sdk
│  └─ smoke.sh                # E2E: schedule→assign→reserve→report
│
└─ .ai/
   ├─ context.md              # System prompt for dev/agents
   ├─ routines.md             # Diff-only, test-first, etc.
   └─ evals/                  # Golden prompts & expected JSON
```

---

## 🧰 Prerequisites
- **Docker** + **Docker Compose**
- **Node 20+** (for scripts/SDK)
- **Python 3.11+** (API & worker)

---

## 🚀 Quick Start
```bash
# 1) clone repo
git clone <your-fork> contractor-os && cd contractor-os

# 2) (optional) generate SDK from OpenAPI
node scripts/codegen-sdk.ts

# 3) launch local stack (Postgres, pgAdmin, API, Orchestrator)
./scripts/dev-up.sh
# or: docker compose -f infra/docker-compose.yml up --build -d

# 4) seed DB (if needed)
./scripts/db-reset.sh

# 5) run smoke test (schedule → assign → reserve → low-stock)
./scripts/smoke.sh
```

### Services (defaults)
- **API**: http://localhost:8000 (Swagger at `/docs`)
- **Orchestrator**: http://localhost:8080
- **pgAdmin**: http://localhost:5050 (admin@example.com / admin)
- **Postgres**: `localhost:5432` (user: `contractor`, pass: `contractor`)

---

## 🔐 Environment
Copy `infra/.env.example` to `infra/.env` and add secrets as needed.
```
PGUSER=contractor
PGPASSWORD=contractor
PGDATABASE=contractor
PGHOST=db
PGPORT=5432
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin
TZ=America/New_York
```

---

## 🧪 Local Development (Docker Compose)
See `infra/docker-compose.yml` (also self-documented in comments).

---

## 🌐 API (FastAPI)
App entry: `apps/api/app/main.py`.
Routes: `apps/api/app/routers/` (customers, jobs, inventory).

**Key endpoints (MVP):**
- `GET /health`
- `GET /customers`
- `GET /jobs` | `POST /jobs`
- `POST /jobs/{id}/assignments`
- `POST /inventory/check`
- `POST /inventory/reserve`

Swagger UI at `http://localhost:8000/docs`.

---

## 🤖 Orchestrator (Agents)
Entry: `services/orchestrator/src/index.ts`.
Responsibilities: parse intent → validate → call tools (API) → emit events → confirm high-risk actions.

Tool contracts defined in `contracts/tools.schema.json`.

---

## 📜 Contracts & SDK
- **OpenAPI** spec: `contracts/openapi.yaml`.
- Generate client to `packages/sdk`: `node scripts/codegen-sdk.ts`.
- **Structured Outputs** schemas in `contracts/structured-outputs/`.

---

## ✅ Testing
- API tests under `apps/api/tests/` (add later).
- Orchestrator tests under `services/orchestrator/tests/` (add later).

---

## 🛫 Deploy (later)
**Enterprise Deployment Summary (for later reference)**
- One container per service: API, Orchestrator, Worker, Web.
- Ingress/Gateway fronts API & Orchestrator; workers internal-only.
- Start w/ one Postgres; evolve to database-per-service or separate schemas.
- Reliability: message bus, idempotency keys, retries with jitter, DLQs.
- Observability: OpenTelemetry, structured logs, RED metrics.
- Security: service identities (JWT/mTLS), least-priv DB roles, SBOM/vuln scans.
- CI/CD: pipeline per service; contract-first; canary/blue-green.


