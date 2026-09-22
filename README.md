# Travida Logistics — Website

A single-page marketing site for Travida Logistics (Grade-B to Grade-A warehouse
retrofit, compliance advisory, solar integration, and asset monetization) with a
full admin panel for managing every section of the site without touching code.

- **Frontend:** React 19 + Vite + Tailwind CSS 4 + React Router
- **Backend:** Express API running as a Vercel serverless function, Supabase
  (Postgres) for content/submissions/admin storage, JWT-based admin auth
- **Admin panel:** Login-protected `/admin` area to edit every homepage section
  and view contact form submissions — changes go live immediately.

## Project structure

```
client/   React + Tailwind frontend (public site + admin panel)
server/   Express app (routes, Supabase-backed storage, seed script)
api/      Vercel serverless entrypoint — re-exports the Express app from server/
```

On Vercel, one project serves both: the client build is the static site, and
any request to `/api/*` is routed to the Express app running as a serverless
function (via `api/[...all].js`). Locally, `server/index.js` runs the same
Express app as a standalone process instead.

## Prerequisites

- Node.js 18+ and npm
- A free [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account, for deployment

## 1. Create the Supabase project

1. Create a new project at supabase.com (any region/plan).
2. Open **SQL Editor → New query**, paste the contents of
   `server/supabase/schema.sql`, and run it. This creates three tables
   (`site_content`, `contact_submissions`, `admin_users`) with Row Level
   Security enabled and no public policies — only your backend's
   service-role key can read/write them, the browser never talks to
   Supabase directly.
3. Open **Project Settings → API** and note down:
   - **Project URL** → `SUPABASE_URL`
   - **service_role secret key** (not the `anon` key) → `SUPABASE_SERVICE_ROLE_KEY`
     — keep this secret, it grants full database access.

## 2. Seed default content + create your admin account

```bash
cd server
cp .env.example .env
```

Fill in `server/.env`: `JWT_SECRET` (any long random string), `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_USERNAME` / `ADMIN_PASSWORD` (your
desired admin login).

```bash
npm install
npm run seed
```

This is idempotent — safe to re-run later (e.g. after adding a new content
section in code). It never overwrites content you've already edited or an
existing admin's password.

## 3. Local development

```bash
# Terminal 1
cd server
npm run dev             # http://localhost:4000

# Terminal 2
cd client
cp .env.example .env    # VITE_API_URL=http://localhost:4000/api
npm install
npm run dev              # http://localhost:5173
```

Visit `http://localhost:5173` for the public site and
`http://localhost:5173/admin/login` to sign in to the admin panel.

## 4. Deploy to Vercel

1. On vercel.com: **Add New → Project**, import this GitHub repo.
2. Vercel reads `vercel.json` at the repo root automatically — no manual
   build configuration needed.
3. Before (or right after) the first deploy, go to **Project Settings →
   Environment Variables** and add for Production + Preview:
   - `JWT_SECRET` — same value as `server/.env`, or a new long random string
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy. Vercel builds the client (`client/dist`) as the static site and
   deploys `api/[...all].js` as a serverless function handling all `/api/*`
   requests — same origin, so no CORS configuration needed in production.

## 5. Point your domain at it

In the Vercel project: **Settings → Domains → Add**, enter your domain
(e.g. `www.travidalogistics.in`), and follow Vercel's instructions to add
the DNS record it shows you (usually a `CNAME` to `cname.vercel-dns.com` for
a subdomain, or an `A` record for an apex/root domain) at your domain
registrar. Vercel provisions HTTPS automatically once DNS propagates
(can take a few minutes to a few hours).

## Managing content

Every section on the homepage — Hero, Problem Statement, Services, Process
Timeline, Stakeholder Tabs, Why Choose Travida, Contact Info, and Site
Settings — has its own editor in the admin panel (`/admin`). Array-based
sections (services, process phases, stakeholder tabs, differentiators,
metrics) support adding, removing, and reordering items. Saved changes are
written straight to Supabase and reflected on the live site immediately (no
rebuild or redeploy required).

Contact form submissions are stored in the `contact_submissions` table and
are viewable/markable/deletable from the admin panel's Submissions page.

## Security notes

- Change the default admin password immediately after first login via
  **Admin → Site Settings → Change Admin Password**.
- Never commit `server/.env` — it holds your Supabase service-role key and
  JWT secret. It's already git-ignored; `server/.env.example` is the template.
- `SUPABASE_SERVICE_ROLE_KEY` must only ever live in `server/.env` (local) or
  Vercel's server-side environment variables — never in client code or a
  `VITE_*` variable, since anything prefixed `VITE_` is bundled into the
  public frontend JS.
- The contact form has server-side validation and a soft IP-based rate limit
  (5 submissions / 10 minutes per IP). On serverless this resets on cold
  starts, so treat it as a deterrent rather than a hard guarantee.
