import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initStore } from './store.js';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import contactRoutes from './routes/contact.js';

if (!process.env.JWT_SECRET) {
  console.error('[travida-server] JWT_SECRET is not set. Set it in server/.env before starting.');
  process.exit(1);
}

initStore();

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[travida-server] listening on port ${PORT}`);
});
