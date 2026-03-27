import express from 'express';
import { categories } from '../../data/data.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const category = categories.find(c => c.id === req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Categoría no encontrada' });
  }
  res.json(category);
});

export default router;
