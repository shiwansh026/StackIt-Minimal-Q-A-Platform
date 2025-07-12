const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // For free tier without database, return success
  if (!userModel.findByUsername) {
    return res.json({ success: true, message: 'Registration successful (demo mode)' });
  }
  
  userModel.findByUsername(username, (err, user) => {
    if (err) {
      return res.json({ success: false, message: 'Database not available (free tier mode)' });
    }
    if (user) return res.json({ success: false, message: 'Username exists' });
    const hash = bcrypt.hashSync(password, 10);
    userModel.create(username, hash, (err) => {
      if (err) return res.json({ success: false, message: 'Registration failed' });
      res.json({ success: true });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // For free tier without database, return demo token
  if (!userModel.findByUsername) {
    const demoToken = jwt.sign({ id: 1, username: username }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token: demoToken, message: 'Demo login successful' });
  }
  
  userModel.findByUsername(username, (err, user) => {
    if (err) {
      return res.json({ message: 'Database not available (free tier mode)' });
    }
    if (!user) return res.json({ message: 'Invalid credentials' });
    if (!bcrypt.compareSync(password, user.password)) return res.json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
