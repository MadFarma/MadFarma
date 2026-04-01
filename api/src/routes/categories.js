import express from 'express';
import { supabase } from '../supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const categories = (data || []).map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    image: c.image,
    subcategories: c.subcategories || [],
  }));

  res.json(categories);
});

router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    return res.status(500).json({ error: error.message });
  }

  res.json({
    id: data.id,
    name: data.name,
    icon: data.icon,
    image: data.image,
    subcategories: data.subcategories || [],
  });
});

export default router;
