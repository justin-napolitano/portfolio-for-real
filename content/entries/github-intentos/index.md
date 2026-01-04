---
slug: github-intentos
id: github-intentos
title: Deploying FastAPI with Terraform and Cloud Run
repo: justin-napolitano/intentos
githubUrl: 'https://github.com/justin-napolitano/intentos'
generatedAt: '2025-11-24T21:35:13.888Z'
source: github-auto
summary: >-
  A guide to setting up a FastAPI app with Terraform and deploying it to Google
  Cloud Run.
tags:
  - fastapi
  - terraform
  - cloud run
  - gcloud
  - docker
  - makefile
  - vpc
  - serverless
seoPrimaryKeyword: fastapi terraform cloud run deployment
seoSecondaryKeywords:
  - gcloud setup
  - terraform infrastructure
  - docker fastapi
  - cloud run deployment
  - makefile build deploy
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

Hardcoded for **project** `intentos-dev` and **region** `us-central1`.

## Contents
- FastAPI app with `/healthz`
- Terraform for enabling APIs, VPC + Serverless VPC Connector, Artifact Registry
- Makefile helpers for build/deploy

## Prereqs
- `gcloud` CLI authenticated to `intentos-dev`
- `terraform >= 1.7`
- Docker

## Quick Start

```bash
# 1) Infra
cd infra/envs/dev
terraform init
terraform apply -auto-approve

# 2) App (local run)
cd ../../..
python -m venv .venv && source .venv/bin/activate
pip install -r app/requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8080

# 3) Build & Deploy to Cloud Run (optional)
make build
make push
make deploy
```

> Note: Creating a brand-new GCP **project** via Terraform requires `org_id` and `billing_account` which are **not** included here. This scaffold assumes `intentos-dev` already exists. The `enable_apis` module activates required services in that project.


