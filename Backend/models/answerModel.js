const db = require('./db');

exports.getByQuestionId = (questionId, callback) => {
  db.query('SELECT * FROM answers WHERE question_id = ? ORDER BY created_at ASC', [questionId], (err, results) => {
    callback(err, results);
  });
};

exports.create = (questionId, body, author, callback) => {
  db.query(
    'INSERT INTO answers (question_id, body, author, created_at) VALUES (?, ?, ?, NOW())',
    [questionId, body, author],
    (err, result) => {
      callback(err, result);
    }
  );
};
