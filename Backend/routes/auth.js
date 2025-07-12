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
  
  // For free tier without database, return success
  console.log('Database available check:', !!userModel.findByUsername);
  if (!userModel.findByUsername) {
    console.log('Database not available, returning demo success');
    return res.json({ success: true, message: 'Registration successful (demo mode)' });
  }
  
  userModel.findByUsername(username, (err, user) => {
    if (err) {
      console.log('Database error during registration:', err.message);
      return res.json({ success: false, message: 'Database not available (free tier mode)' });
    }
    if (user) {
      console.log('Username already exists:', username);
      return res.json({ success: false, message: 'Username already exists' });
    }
    
    const hash = bcrypt.hashSync(password, 10);
    userModel.create(username, hash, (err) => {
      if (err) {
        console.log('Failed to create user:', err.message);
        return res.json({ success: false, message: 'Registration failed' });
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
  
  // For free tier without database, return demo token
  if (!userModel.findByUsername) {
    console.log('Database not available, returning demo token');
    const demoToken = jwt.sign({ id: 1, username: username }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token: demoToken, message: 'Demo login successful' });
  }
  
  userModel.findByUsername(username, (err, user) => {
    if (err) {
      console.log('Database error during login:', err.message);
      return res.json({ message: 'Database not available (free tier mode)' });
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
