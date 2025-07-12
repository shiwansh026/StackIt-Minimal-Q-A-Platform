const express = require('express');
const answerModel = require('../models/answerModel');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

// Get all answers for a question (public)
router.get('/:id/answers', (req, res) => {
  answerModel.getByQuestionId(req.params.id, (err, answers) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(answers);
  });
});

// Post an answer to a question (protected)
router.post('/:id/answers', authenticateToken, (req, res) => {
  const { body } = req.body;
  const author = req.user.username; // Provided by auth middleware
  answerModel.create(req.params.id, body, author, (err, result) => {
    if (err) return res.json({ success: false, message: 'Failed to post answer' });
    res.json({ success: true, id: result.insertId });
  });
});

module.exports = router;
