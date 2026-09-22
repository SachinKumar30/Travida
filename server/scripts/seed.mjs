// One-time setup script: seeds default homepage content and creates the
// first admin account in Supabase. Safe to re-run — it only fills in
// content sections and an admin account that don't already exist, it never
// overwrites content you've already edited or an existing admin password.
//
// Usage:
//   cd server
//   cp .env.example .env   # fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
//                           # ADMIN_USERNAME, ADMIN_PASSWORD
//   node scripts/seed.mjs

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { supabase } from '../lib/supabase.js';
import { defaultContent } from '../data/defaultContent.js';

async function seedContent() {
  const { data: existing, error: readError } = await supabase
    .from('site_content')
    .select('section');
  if (readError) throw new Error(`Could not read site_content: ${readError.message}`);

  const existingSections = new Set(existing.map((row) => row.section));
  const missing = Object.entries(defaultContent).filter(([section]) => !existingSections.has(section));

  if (missing.length === 0) {
    console.log('[seed] site_content already has all sections — nothing to add.');
    return;
  }

  const rows = missing.map(([section, data]) => ({ section, data }));
  const { error: insertError } = await supabase.from('site_content').insert(rows);
  if (insertError) throw new Error(`Could not seed content: ${insertError.message}`);
  console.log(`[seed] Added ${rows.length} content section(s): ${missing.map(([s]) => s).join(', ')}`);
}

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.warn('[seed] ADMIN_USERNAME/ADMIN_PASSWORD not set — skipping admin account creation.');
    return;
  }

  const { data: existing, error: readError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  if (readError) throw new Error(`Could not read admin_users: ${readError.message}`);

  if (existing) {
    console.log(`[seed] Admin account "${username}" already exists — leaving password untouched.`);
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const { error: insertError } = await supabase
    .from('admin_users')
    .insert({ username, password_hash: passwordHash });
  if (insertError) throw new Error(`Could not create admin account: ${insertError.message}`);
  console.log(`[seed] Created admin account "${username}".`);
}

try {
  await seedContent();
  await seedAdmin();
  console.log('[seed] Done.');
  process.exit(0);
} catch (err) {
  console.error('[seed] Failed:', err.message);
  process.exit(1);
}
