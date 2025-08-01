import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Admin Registration
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res.status(403).json({ message: 'Admin already exists. Registration is disabled.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword,role:"admin" });
    await newUser.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// Admin/User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id },  // optional role if used later
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Send token and basic user info
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: 'admin'
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;