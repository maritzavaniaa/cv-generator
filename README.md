# Auto-Generate CV

**Phase 0 — Foundation & Local Walking Skeleton.**

This phase only validates the local pipeline `Next.js → Prisma → Neon` and basic
project quality (lint / typecheck / build). No product features (auth, library,
builder, PDF export) are implemented yet.

## Prerequisites

- Node.js 22+
- npm
- A [Neon](https://neon.tech) account (free tier) with a Postgres project

## Installation

```bash
npm install
```

## Environment Setup

Copy the example env file and fill in your Neon connection string:

```bash
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to your Neon project's connection string (found in
the Neon dashboard under Connection Details). Never commit `.env` — it is
already git-ignored.

## Prisma

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply the initial migration to your database:

```bash
npx prisma migrate dev
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page shows
"Database Connected" once Prisma can reach Neon. You can also check
[http://localhost:3000/api/health](http://localhost:3000/api/health) directly.

## Quality Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

All three must pass before any change is considered done.

## CI

`.github/workflows/ci.yml` runs install, lint, typecheck, and build on every
push/PR. It only runs **after you manually push to GitHub** — this repository
does not push, commit, or open PRs on its own; all Git operations are done by
hand by the maintainer.
