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

router.get('/', async (req, res, next) => {
  try {
    res.json(await getContent());
  } catch (err) {
    next(err);
  }
});

router.put('/:section', requireAuth, async (req, res, next) => {
  const { section } = req.params;
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({ error: `Unknown section: ${section}` });
  }
  if (req.body === undefined || req.body === null) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  try {
    const updated = await updateContentSection(section, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
