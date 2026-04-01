import express from 'express';
import { supabase } from '../supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.query;
  
  let query = supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const orders = (data || []).map(order => ({
    id: order.id,
    date: order.created_at,
    deliveryDate: order.delivery_date,
    items: order.order_items,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    total: order.total,
    status: order.status,
    pointsEarned: order.points_earned,
    shippingAddress: order.shipping_address,
    paymentMethod: order.payment_method,
  }));

  res.json(orders);
});

router.post('/', async (req, res) => {
  const { userId, items, total, shippingAddress, paymentMethod, discount = 0 } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }
  
  const orderId = `ORD-${Date.now()}`;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 35 ? 0 : 7.90;
  const pointsEarned = items.reduce((sum, item) => sum + (item.points || 0) * item.quantity, 0);

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      id: orderId,
      user_id: userId,
      subtotal,
      discount,
      shipping,
      total,
      points_earned: pointsEarned,
      payment_method: paymentMethod,
      shipping_address: shippingAddress,
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) {
    return res.status(500).json({ error: orderError.message });
  }

  const orderItems = items.map(item => ({
    order_id: orderId,
    product_id: item.id,
    product_name: item.name,
    product_image: item.image,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error inserting order items:', itemsError.message);
  }

  res.status(201).json({
    id: order.id,
    date: order.created_at,
    deliveryDate: order.delivery_date,
    items: orderItems,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    total: order.total,
    status: order.status,
    pointsEarned: order.points_earned,
    shippingAddress: order.shipping_address,
    paymentMethod: order.payment_method,
  });
});

router.get('/:id', async (req, res) => {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', req.params.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    return res.status(500).json({ error: error.message });
  }

  res.json({
    id: order.id,
    date: order.created_at,
    deliveryDate: order.delivery_date,
    items: order.order_items,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    total: order.total,
    status: order.status,
    pointsEarned: order.points_earned,
    shippingAddress: order.shipping_address,
    paymentMethod: order.payment_method,
  });
});

export default router;
