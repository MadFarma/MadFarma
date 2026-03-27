import express from 'express';
import { products } from '../../data/data.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { category, subcategory, brand, search, minPrice, maxPrice, sort, limit } = req.query;
  
  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (subcategory && subcategory !== 'all') {
    filtered = filtered.filter(p => p.subcategory === subcategory);
  }
  
  if (brand) {
    filtered = filtered.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower)
    );
  }
  
  if (minPrice) {
    filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sort) {
    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
        break;
    }
  }

  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }

  res.json({
    total: filtered.length,
    data: filtered
  });
});

router.get('/featured', (req, res) => {
  const featured = products.filter(p => p.featured);
  res.json(featured);
});

router.get('/offers', (req, res) => {
  const offers = products.filter(p => p.badge === 'offer');
  res.json(offers);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

export default router;
