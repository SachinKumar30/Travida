import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { defaultContent } from './data/defaultContent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

export function initStore() {
  if (!fs.existsSync(CONTENT_FILE)) {
    writeJson(CONTENT_FILE, defaultContent);
  }
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    writeJson(SUBMISSIONS_FILE, []);
  }
  if (!fs.existsSync(ADMIN_FILE)) {
    const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
    const username = process.env.ADMIN_USERNAME || 'admin';
    const passwordHash = bcrypt.hashSync(password, 10);
    writeJson(ADMIN_FILE, { username, passwordHash });
    if (!process.env.ADMIN_PASSWORD) {
      console.warn(
        `\n[travida-server] No ADMIN_PASSWORD set in .env — created default admin user "${username}" with password "${password}". Change this immediately in server/.env and delete server/data/admin.json to regenerate.\n`
      );
    }
  }
}

export function getContent() {
  return readJson(CONTENT_FILE, defaultContent);
}

export function updateContentSection(section, data) {
  const content = getContent();
  if (!(section in content)) {
    throw new Error(`Unknown content section: ${section}`);
  }
  content[section] = data;
  writeJson(CONTENT_FILE, content);
  return content[section];
}

export function replaceAllContent(data) {
  writeJson(CONTENT_FILE, data);
  return data;
}

export function getSubmissions() {
  return readJson(SUBMISSIONS_FILE, []);
}

export function addSubmission(submission) {
  const submissions = getSubmissions();
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    createdAt: new Date().toISOString(),
    read: false,
    ...submission,
  };
  submissions.unshift(entry);
  writeJson(SUBMISSIONS_FILE, submissions);
  return entry;
}

export function markSubmissionRead(id, read = true) {
  const submissions = getSubmissions();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  submissions[idx].read = read;
  writeJson(SUBMISSIONS_FILE, submissions);
  return submissions[idx];
}

export function deleteSubmission(id) {
  const submissions = getSubmissions();
  const next = submissions.filter((s) => s.id !== id);
  writeJson(SUBMISSIONS_FILE, next);
  return next.length !== submissions.length;
}

export function getAdmin() {
  return readJson(ADMIN_FILE, null);
}

export function updateAdminPassword(newPasswordHash) {
  const admin = getAdmin();
  admin.passwordHash = newPasswordHash;
  writeJson(ADMIN_FILE, admin);
}
