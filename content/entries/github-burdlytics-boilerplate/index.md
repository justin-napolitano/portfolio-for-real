---
slug: github-burdlytics-boilerplate
id: github-burdlytics-boilerplate
title: Next.js and Tailwind CSS Boilerplate for Burdlytics
repo: justin-napolitano/burdlytics_boilerplate
githubUrl: 'https://github.com/justin-napolitano/burdlytics_boilerplate'
generatedAt: '2025-11-24T21:34:07.698Z'
source: github-auto
summary: >-
  A minimal boilerplate for building the Burdlytics site with Next.js, Tailwind
  CSS, and Cloudflare DNS integration.
tags:
  - next.js
  - tailwind css
  - vercel
  - cloudflare
  - dns management
seoPrimaryKeyword: next.js tailwind css boilerplate
seoSecondaryKeywords:
  - burdlytics boilerplate
  - cloudflare dns helper
  - vercel deployment
  - javascript boilerplate
  - web app setup
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

This is a minimal Next.js + Tailwind CSS boilerplate for the Burdlytics site:

- Landing page (`/`)
- Login page (`/login`)
- Dashboard stub (`/dashboard`)
- Cloudflare DNS update helper script (`scripts/update-cloudflare-dns.sh`)

## Quick start

1. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

   Then open http://localhost:3000 in your browser.

3. Deploy to Vercel:

   - Push this repo to GitHub.
   - Create a new project in Vercel and import the repo.
   - Vercel will auto-detect Next.js and deploy.

4. Point `burdlytics.com` (or a subdomain) to Vercel using Cloudflare DNS:

   - Get your Vercel-provided domain for this project (e.g. `burdlytics.vercel.app`).
   - Use the helper script to create/update a CNAME via the Cloudflare API.

## Cloudflare DNS helper

The script `scripts/update-cloudflare-dns.sh` uses the Cloudflare API to create or update
a CNAME that points a subdomain (e.g. `app.burdlytics.com`) to your Vercel domain.

You must set these environment variables before running it:

- `CLOUDFLARE_API_TOKEN` – API token with DNS edit permissions for the zone.
- `CLOUDFLARE_ZONE_ID` – The Cloudflare Zone ID for your domain (e.g. `burdlytics.com`).
- `CF_DNS_NAME` – The DNS name you want to manage (e.g. `app.burdlytics.com`).
- `CF_DNS_TARGET` – The target CNAME, typically your Vercel domain (e.g. `your-project.vercel.app`).

Then run:

```bash
chmod +x scripts/update-cloudflare-dns.sh
./scripts/update-cloudflare-dns.sh
```

The script is idempotent: it will create the record if it doesn't exist or update it if it does.

---


