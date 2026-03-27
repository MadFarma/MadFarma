import express from 'express';
import { orders } from '../../data/data.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { userId } = req.query;
  let filtered = orders;
  
  if (userId) {
    filtered = orders.filter(o => o.userId === userId);
  }
  
  res.json(filtered);
});

router.post('/', (req, res) => {
  const { userId, items, total, shippingAddress, paymentMethod } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }
  
  const newOrder = {
    id: `ORD-${Date.now()}`,
    userId,
    items,
    total,
    shippingAddress,
    paymentMethod,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }
  res.json(order);
});

export default router;
