import express from 'express';
import { users } from '../../data/data.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.post('/register', (req, res) => {
  const { email, password, name, phone } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email ya registrado' });
  }
  
  const newUser = {
    id: String(users.length + 1),
    email,
    password,
    name,
    phone,
    address: null
  };
  
  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

export default router;
