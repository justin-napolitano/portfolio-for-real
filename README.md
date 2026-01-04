This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Commit log data refresh

The home page shows the 10 most recent commits pulled from your GitHub account. Set the following environment variables so the script/API can call GitHub safely:

- `GITHUB_TOKEN` — personal access token with `repo` scope (or `public_repo` if you only need public commits)
- `GITHUB_USERNAME` — the username to query (defaults to `$USER` if omitted)
- `CRON_SECRET` — shared secret passed as `?key=` to guard the integration endpoint
- Variables can live in `.env.local`; both the script and API route load that file automatically before falling back to your shell env.

### Local/manual refresh

```bash
npm run update:commits
```

This command writes `data/recent-commits.json`, which the app uses as a local fallback if the database is empty.

### Hosted refresh (Vercel + GitHub Actions)

Deploy the site with the env vars above. Then configure the provided workflow (`.github/workflows/commit-log-sync.yml`) by setting the `CRON_SECRET` repository secret (and optional repo variable `DOCS_ORIGIN`, defaults to `https://docs.jnap.me`). The workflow curls:

```bash
GET https://docs.jnap.me/api/integrations/github-commit-log?key=$CRON_SECRET
```

That endpoint fetches commits from GitHub, stores them in Postgres, and the home page renders the latest rows at request time. Run it once a day (or as frequently as you like) to keep the history fresh.
