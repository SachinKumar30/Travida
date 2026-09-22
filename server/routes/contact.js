import { Router } from 'express';
import { addSubmission, getSubmissions, markSubmissionRead, deleteSubmission } from '../store.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort in-memory rate limiter: max 5 submissions per IP per 10 minutes.
// On serverless (Vercel), this resets on cold starts, so it's a soft
// deterrent rather than a hard guarantee — fine for a low-traffic contact form.
const submissionLog = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

router.post('/', async (req, res, next) => {
  try {
    const ip = req.ip;
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
    }

    const { name, email, company, inquiryType, message, phone } = req.body || {};

    const errors = {};
    if (!name || !name.trim()) errors.name = 'Name is required';
    if (!email || !EMAIL_RE.test(email)) errors.email = 'A valid email is required';
    if (!inquiryType || !inquiryType.trim()) errors.inquiryType = 'Please select an inquiry type';
    if (!message || !message.trim()) errors.message = 'Message is required';
    if (name && name.length > 200) errors.name = 'Name is too long';
    if (message && message.length > 5000) errors.message = 'Message is too long';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: 'Validation failed', fields: errors });
    }

    const entry = await addSubmission({
      name: name.trim(),
      email: email.trim(),
      company: (company || '').trim(),
      phone: (phone || '').trim(),
      inquiryType: inquiryType.trim(),
      message: message.trim(),
    });

    res.status(201).json({ success: true, id: entry.id });
  } catch (err) {
    next(err);
  }
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    res.json(await getSubmissions());
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/read', requireAuth, async (req, res, next) => {
  try {
    const updated = await markSubmissionRead(req.params.id, req.body?.read !== false);
    if (!updated) return res.status(404).json({ error: 'Submission not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const ok = await deleteSubmission(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Submission not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
