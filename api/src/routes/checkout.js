import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, success_url, cancel_url, userId, shippingAddress } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe usa céntimos
      },
      quantity: item.quantity,
    }));

    // Si hay gastos de envío (<35€)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (subtotal < 35) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Gastos de envío',
          },
          unit_amount: 790, // 7.90€
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url,
      metadata: {
        userId,
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
