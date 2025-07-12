const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  userModel.findByUsername(username, (err, user) => {
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
  userModel.findByUsername(username, (err, user) => {
    if (!user) return res.json({ message: 'Invalid credentials' });
    if (!bcrypt.compareSync(password, user.password)) return res.json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
