import { Router } from 'express';
import { getContent, updateContentSection } from '../store.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const VALID_SECTIONS = [
  'hero',
  'problem',
  'services',
  'process',
  'stakeholders',
  'whyChoose',
  'contact',
  'meta',
];

router.get('/', (req, res) => {
  res.json(getContent());
});

router.put('/:section', requireAuth, (req, res) => {
  const { section } = req.params;
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({ error: `Unknown section: ${section}` });
  }
  if (req.body === undefined || req.body === null) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  try {
    const updated = updateContentSection(section, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
