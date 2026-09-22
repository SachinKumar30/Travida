import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getAdminByUsername, updateAdminPassword } from '../store.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const admin = await getAdminByUsername(username);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = bcrypt.compareSync(password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, username });
  } catch (err) {
    next(err);
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

router.post('/change-password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }
    const admin = await getAdminByUsername(req.admin.username);
    if (!admin) {
      return res.status(401).json({ error: 'Admin account not found' });
    }
    const valid = bcrypt.compareSync(currentPassword, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    const hash = bcrypt.hashSync(newPassword, 10);
    await updateAdminPassword(req.admin.username, hash);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
