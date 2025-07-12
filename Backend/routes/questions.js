const express = require('express');
const questionModel = require('../models/questionModel');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get all questions (public)
router.get('/', (req, res) => {
  questionModel.getAll((err, questions) => {
    if (err) {
      // For free tier without database, return empty array
      return res.json([]);
    }
    res.json(questions);
  });
});

// Get a single question by ID (public)
router.get('/:id', (req, res) => {
  questionModel.getById(req.params.id, (err, question) => {
    if (err) {
      // For free tier without database, return null
      return res.json(null);
    }
    res.json(question || null);
  });
});

// Post a new question (protected)
router.post('/', authenticateToken, (req, res) => {
  const { title, body } = req.body;
  const author = req.user.username; // Provided by auth middleware
  
  questionModel.create(title, body, author, (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Database not available (free tier mode)' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

module.exports = router;
