import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY || '';

const router = express.Router();

router.get('/config', (req, res) => {
  res.json({ publicKey: PUBLIC_KEY });
});

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', items, customerEmail } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Amount must be at least 0.50€' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items || []),
      },
      receipt_email: customerEmail,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ 
      error: 'Payment initialization failed',
      message: error.message 
    });
  }
});

router.post('/create-subscription', async (req, res) => {
  try {
    const { email, priceId } = req.body;

    const customer = await stripe.customers.create({
      email,
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
    });
  } catch (error) {
    console.error('Stripe subscription error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = envVars.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = JSON.parse(req.body);
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.json({ received: true });
});

export default router;