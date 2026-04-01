import express from 'express';
import { supabase } from '../supabase.js';
import crypto from 'crypto';

const router = express.Router();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = hashPassword(password);

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password_hash', passwordHash)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const { password_hash, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body;
  const passwordHash = hashPassword(password);

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    return res.status(400).json({ error: 'Email ya registrado' });
  }

  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      email,
      name,
      phone,
      password_hash: passwordHash,
      points: 0,
      level: 'Bronce',
      total_points: 0,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const { password_hash, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

router.get('/:id', async (req, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { password_hash, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.put('/:id', async (req, res) => {
  const { name, phone, avatar } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .update({
      name,
      phone,
      avatar,
      updated_at: new Date().toISOString(),
    })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const { password_hash, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

export default router;
