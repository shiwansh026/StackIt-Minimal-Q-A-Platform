const express = require('express');
const questionModel = require('../models/questionModel');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get all questions (public)
router.get('/', (req, res) => {
  questionModel.getAll((err, questions) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(questions);
  });
});

// Get a single question by ID (public)
router.get('/:id', (req, res) => {
  questionModel.getById(req.params.id, (err, question) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(question || null);
  });
});

// Post a new question (protected)
router.post('/', authenticateToken, (req, res) => {
  const { title, body } = req.body;
  const author = req.user.username; // Provided by auth middleware
  questionModel.create(title, body, author, (err, result) => {
    if (err) return res.json({ success: false, message: 'Failed to post question' });
    res.json({ success: true, id: result.insertId });
  });
});

module.exports = router;
