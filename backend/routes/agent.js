import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { name, email, mobile, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const agent = new User({ name, email, mobile, password: hashedPassword, role: 'agent' });
  await agent.save();
  res.json({ message: 'Agent added successfully' });
});

router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const agents = await User.find({ role: 'agent' });
  res.json(agents);
});

export default router;