import express from 'express';
import { brands } from '../../data/data.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(brands);
});

export default router;
