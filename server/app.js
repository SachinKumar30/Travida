import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import contactRoutes from './routes/contact.js';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set. Set it in server/.env (local) or your host\'s env vars.');
}

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

export default app;
