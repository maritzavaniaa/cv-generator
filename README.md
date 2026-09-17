# Auto-Generate CV

**Phase 1 — Authentication.** Google OAuth via Auth.js, with a minimal
protected `/dashboard`. Library, builder, CV versioning, and PDF export are
still not implemented.

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

## Auth Setup

Generate a session secret:

```bash
openssl rand -base64 33
```

Set it as `AUTH_SECRET` in `.env`.

### Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.
2. Create an **OAuth 2.0 Client ID** (Application type: **Web application**).
3. Under **Authorized JavaScript origins**, add:
   ```
   http://localhost:3000
   ```
4. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. Copy the generated **Client ID** and **Client Secret** into `.env` as
   `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

Production URLs are not configured yet — deployment is a later phase.

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

Sign in at [http://localhost:3000/login](http://localhost:3000/login) with
Google. `/dashboard` requires an authenticated session and redirects to
`/login` otherwise.

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
