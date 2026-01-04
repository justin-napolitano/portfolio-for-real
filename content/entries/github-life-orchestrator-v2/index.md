---
slug: github-life-orchestrator-v2
id: github-life-orchestrator-v2
title: Automate Your Shopping List with Notion and Postgres
repo: justin-napolitano/life-orchestrator-v2
githubUrl: 'https://github.com/justin-napolitano/life-orchestrator-v2'
generatedAt: '2025-11-24T21:35:28.133Z'
source: github-auto
summary: >-
  Learn how to set up a Notion-integrated shopping list using Postgres and
  Docker for seamless inventory management.
tags:
  - notion
  - postgres
  - docker
  - playwright
  - automation
  - shopping list
seoPrimaryKeyword: notion shopping list automation
seoSecondaryKeywords:
  - docker compose setup
  - postgres database integration
  - notion sync
  - weekly shopping list
  - headless browser automation
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

**What you get**
- Postgres DB (source of truth)
- Notion sync (publish + ingest `On hand`, `Par`, `Preferred store`)
- Build weekly shopping list from gaps
- Export CSV
- Playwright demo to add items to a Walmart cart (headless browser)

> Note: Retailer automation is fragile and may violate ToS. Use for personal learning.

## Quick start

1) Copy env
```
cp .env.example .env
# Fill NOTION_TOKEN and NOTION_PARENT_PAGE_ID
```

2) Up services
```
docker compose up --build -d
```

3) Seed some items
```
docker compose exec db psql -U ${POSTGRES_USER:-lifeos} -d ${POSTGRES_DB:-lifeos} -c "insert into items (name, unit, par_qty, on_hand, preferred_store) values ('Coffee Beans','bag',2,0,'Costco'),('Eggs','dozen',2,1,'Walmart'),('Olive Oil','bottle',1,0,'Amazon') on conflict do nothing;"
```

4) Create Notion DB
```
docker compose exec orchestrator python -m app.cli create_notion_db
# paste NOTION_DB_ID into .env, then:
docker compose restart orchestrator
```

5) Push to Notion
```
docker compose exec orchestrator python -m app.cli sync_push
```

6) Edit in Notion, then Pull
```
docker compose exec orchestrator python -m app.cli sync_pull
```

7) Build/Export list
```
docker compose exec orchestrator python -m app.cli build_list --name "Weekly Staples"
# copy LIST_ID, then:
docker compose exec orchestrator python -m app.cli export_list <LIST_ID> /app/list.csv
docker cp $(docker compose ps -q orchestrator):/app/list.csv ./list.csv
```

8) (Optional) Walmart demo
```
# First run non-headless to log in manually (will save session to walmart-state.json)
docker compose exec -it orchestrator bash -lc "python -c "import asyncio;from app.carts.walmart import add_to_cart;asyncio.run(add_to_cart([{'name':'Milk 1 gallon','qty':1}]))""
# Then from CSV:
docker compose exec orchestrator python -m app.cli walmart_cart /app/list.csv
```

API also available at http://localhost:8000/health etc.


### Notion Shopping List (new)
Create a separate Notion DB for the **Shopping List** lines:
```bash
docker compose exec orchestrator python -m app.cli create_notion_shopping_db
# paste NOTION_SHOPPING_DB_ID into .env and restart
docker compose restart orchestrator
```
Now you can add rows directly in Notion (Item / Qty / Unit / Store).  
When you pull, they will be upserted into your DB (and any new Items will be created automatically):

```bash
docker compose exec orchestrator python -m app.cli sync_pull_shopping --list-name "Weekly Staples"
```


