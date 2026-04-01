import express from 'express';
import { supabase } from '../supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { category, subcategory, brand, search, minPrice, maxPrice, sort, limit } = req.query;
  
  let query = supabase.from('products').select('*');

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  if (subcategory && subcategory !== 'all') {
    query = query.eq('subcategory', subcategory);
  }
  
  if (brand) {
    query = query.ilike('brand', `%${brand}%`);
  }
  
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }
  
  if (minPrice) {
    query = query.gte('price', parseFloat(minPrice));
  }
  
  if (maxPrice) {
    query = query.lte('price', parseFloat(maxPrice));
  }

  if (sort) {
    switch (sort) {
      case 'price-asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price-desc':
        query = query.order('price', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'reviews':
        query = query.order('reviews', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      default:
        query = query.order('id', { ascending: true });
    }
  } else {
    query = query.order('id', { ascending: true });
  }

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const { data, error } = await query;
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const products = (data || []).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price,
    category: p.category,
    subcategory: p.subcategory,
    brand: p.brand,
    image: p.image,
    images: p.images,
    badge: p.badge,
    description: p.description,
    descriptionFull: p.description_full,
    points: p.points,
    inStock: p.in_stock,
    stockCount: p.stock,
    rating: p.rating,
    reviews: p.reviews,
    features: p.features,
    composition: p.composition,
    howToUse: p.how_to_use,
    ageGroup: p.age_group,
    skinType: p.skin_type,
  }));

  res.json({
    total: products.length,
    data: products
  });
});

router.get('/featured', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(8);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data || []);
});

router.get('/offers', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('badge', ['sale', '2x1'])
    .not('original_price', 'is', null)
    .limit(8);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data || []);
});

router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.status(500).json({ error: error.message });
  }

  res.json({
    id: data.id,
    name: data.name,
    price: data.price,
    originalPrice: data.original_price,
    category: data.category,
    subcategory: data.subcategory,
    brand: data.brand,
    image: data.image,
    images: data.images,
    badge: data.badge,
    description: data.description,
    descriptionFull: data.description_full,
    points: data.points,
    inStock: data.in_stock,
    stockCount: data.stock,
    rating: data.rating,
    reviews: data.reviews,
    features: data.features,
    composition: data.composition,
    howToUse: data.how_to_use,
    ageGroup: data.age_group,
    skinType: data.skin_type,
  });
});

export default router;
