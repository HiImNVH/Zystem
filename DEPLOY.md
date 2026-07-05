# Zystem Monorepo Deploy

This repository is intended to stay as a monorepo:

```text
Zystem/
├─ frontend/
└─ backend/
```

Deploy the two apps separately by selecting the correct root directory on each hosting platform.

## Frontend

Recommended free hosts:

- Vercel
- Cloudflare Pages

Settings:

```text
Root directory: frontend
Build command: npm run build
Output directory: dist
```

Environment variables:

```text
VITE_API_URL=https://your-backend-url
```

## Backend

Recommended free/cold-start host:

- Render Web Service

Settings:

```text
Root directory: backend
Build command: npm install
Start command: npm start
```

Environment variables:

```text
NODE_ENV=production
DATABASE_URL=postgresql://...
DB_SSL=true
CORS_ORIGIN=https://your-frontend-url
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
LOG_LEVEL=info
RESET_DATABASE_ON_START=false
```

`PORT` is usually provided automatically by Render. Do not set `RESET_DATABASE_ON_START=true` in public alpha unless you intentionally want to wipe all tester data on every backend boot.

## Database

Recommended free database:

- Neon Postgres

Do not expose PostgreSQL directly to the public internet. Only the backend should connect to the database.

Use Neon's pooled or direct connection string as `DATABASE_URL`. Keep SSL enabled with `DB_SSL=true`.

## Cold Start Note

Free backend hosts may sleep when idle. The first request after inactivity can take 30-60 seconds. This is acceptable for public alpha testing as long as testers know the first load may be slow.
