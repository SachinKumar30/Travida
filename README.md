# Travida Logistics — Website

A single-page marketing site for Travida Logistics (Grade-B to Grade-A warehouse
retrofit, compliance advisory, solar integration, and asset monetization) with a
full admin panel for managing every section of the site without touching code.

- **Frontend:** React 19 + Vite + Tailwind CSS 4 + React Router
- **Backend:** Node.js + Express, JSON-file content store, JWT-based admin auth
- **Admin panel:** Login-protected `/admin` area to edit every homepage section
  and view contact form submissions — changes go live immediately.

## Project structure

```
client/   React + Tailwind frontend (public site + admin panel)
server/   Express API (content storage, auth, contact form)
```

## Prerequisites

- Node.js 18+ and npm

## 1. Backend setup

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and set:

- `JWT_SECRET` — a long random string
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your admin login (only used the first
  time the server starts, to create the admin account; change the password
  afterwards from the admin panel's Site Settings page)

Then:

```bash
npm install
npm run dev      # starts the API on http://localhost:4000
```

On first start, the server seeds `server/data/content.json` with default
Travida content and creates the admin account from your `.env` values.

## 2. Frontend setup

```bash
cd client
cp .env.example .env   # VITE_API_URL defaults to http://localhost:4000/api
npm install
npm run dev             # starts the site on http://localhost:5173
```

Visit `http://localhost:5173` for the public site and
`http://localhost:5173/admin/login` to sign in to the admin panel.

## Managing content

Every section on the homepage — Hero, Problem Statement, Services, Process
Timeline, Stakeholder Tabs, Why Choose Travida, Contact Info, and Site
Settings — has its own editor in the admin panel (`/admin`). Array-based
sections (services, process phases, stakeholder tabs, differentiators,
metrics) support adding, removing, and reordering items. Saved changes are
written to `server/data/content.json` and reflected on the live site
immediately (no rebuild required).

Contact form submissions are stored in `server/data/submissions.json` and are
viewable/markable/deletable from the admin panel's Submissions page.

## Production build

```bash
cd client
npm run build      # outputs static assets to client/dist
```

Serve `client/dist` from any static host (or behind the Express server /
a reverse proxy), and run `server/index.js` as a long-lived Node process
(e.g. with `pm2` or a systemd service) with `NODE_ENV=production` and a
properly configured `.env`. Point `VITE_API_URL` (build-time) at the
deployed API's public URL.

## Security notes

- Change the default admin password immediately after first login via
  **Admin → Site Settings → Change Admin Password**.
- Never commit `server/.env` or `server/data/*.json` — they contain secrets
  and the admin password hash. Both are already git-ignored.
- The contact form has basic server-side validation and IP-based rate
  limiting (5 submissions / 10 minutes per IP).
