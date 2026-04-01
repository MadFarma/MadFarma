import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Error handler for debugging
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import brandsRouter from './routes/brands.js';
import promotionsRouter from './routes/promotions.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';
import checkoutRouter from './routes/checkout.js';

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);
app.use('/promotions', promotionsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/checkout', checkoutRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'Botica Online API', version: '1.0' });
});

export default app;
