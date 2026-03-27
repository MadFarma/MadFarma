import express from 'express';
import { promotions } from '../../data/data.js';

const router = express.Router();

router.get('/', (req, res) => {
  const active = promotions.filter(p => p.active);
  res.json(active);
});

router.post('/validate', (req, res) => {
  const { code, total } = req.body;
  const promo = promotions.find(p => p.code === code && p.active);
  
  if (!promo) {
    return res.status(404).json({ valid: false, error: 'Cupón no válido' });
  }
  
  if (promo.minPurchase > total) {
    return res.status(400).json({ 
      valid: false, 
      error: `Minimum purchase: €${promo.minPurchase}` 
    });
  }
  
  res.json({ valid: true, discount: promo.discount });
});

export default router;
