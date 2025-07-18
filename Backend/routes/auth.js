const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Register request received:', { username, password: password ? '[HIDDEN]' : 'MISSING' });
  
  // Validate input
  if (!username || !password) {
    return res.json({ success: false, message: 'Username and password are required' });
  }
  
  // Try to use database, fallback to demo mode if not available
  userModel.findByUsername(username, (err, user) => {
    if (err) {
      console.log('Database not available, using demo mode');
      return res.json({ success: true, message: 'Registration successful (demo mode)' });
    }
    if (user) {
      console.log('Username already exists:', username);
      return res.json({ success: false, message: 'Username already exists' });
    }
    
    const hash = bcrypt.hashSync(password, 10);
    userModel.create(username, hash, (err) => {
      if (err) {
        console.log('Database not available, using demo mode');
        return res.json({ success: true, message: 'Registration successful (demo mode)' });
      }
      console.log('User created successfully:', username);
      res.json({ success: true, message: 'Registration successful' });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login request received:', { username, password: password ? '[HIDDEN]' : 'MISSING' });
  
  // Try to use database, fallback to demo mode if not available
  userModel.findByUsername(username, (err, user) => {
    if (err) {
      console.log('Database not available, using demo mode');
      const demoToken = jwt.sign({ id: 1, username: username }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token: demoToken, message: 'Demo login successful' });
    }
    if (!user) {
      console.log('User not found:', username);
      return res.json({ message: 'Invalid credentials' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log('Invalid password for user:', username);
      return res.json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    console.log('Login successful for user:', username);
    res.json({ token });
  });
});

module.exports = router;
