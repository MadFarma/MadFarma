import express from 'express';
import { supabase } from '../supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('active', true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const promotions = (data || []).map(c => ({
    id: c.id,
    code: c.code,
    title: c.description,
    description: c.description,
    discount: c.discount,
    minPurchase: c.min_purchase,
    active: c.active,
  }));

  res.json(promotions);
});

router.post('/validate', async (req, res) => {
  const { code, total } = req.body;
  
  const { data: coupon, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('active', true)
    .single();

  if (error || !coupon) {
    return res.status(404).json({ valid: false, error: 'Cupón no válido' });
  }
  
  if (coupon.min_purchase && total < coupon.min_purchase) {
    return res.status(400).json({ 
      valid: false, 
      error: `Compra mínima: €${coupon.min_purchase}` 
    });
  }
  
  res.json({ 
    valid: true, 
    discount: coupon.discount,
    type: coupon.discount_type 
  });
});

export default router;
