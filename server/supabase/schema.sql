-- Travida Logistics — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- before running `node server/scripts/seed.mjs`.
--
-- All three tables have Row Level Security enabled with NO policies, which
-- means the public/anon key can read or write nothing. Only the
-- SUPABASE_SERVICE_ROLE_KEY (used exclusively by the Express API, never
-- exposed to the browser) can access them. The frontend never talks to
-- Supabase directly — every request goes through the API.

create table if not exists site_content (
  section text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table site_content enable row level security;

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  read boolean not null default false,
  name text not null,
  email text not null,
  company text default '',
  phone text default '',
  inquiry_type text not null,
  message text not null
);
alter table contact_submissions enable row level security;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);
alter table admin_users enable row level security;
