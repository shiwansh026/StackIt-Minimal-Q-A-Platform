const db = require('./db');

exports.getAll = (callback) => {
  if (!db) {
    return callback(new Error('Database not available'), []);
  }
  db.query('SELECT * FROM questions ORDER BY created_at DESC', [], (err, results) => {
    callback(err, results);
  });
};

exports.getById = (id, callback) => {
  if (!db) {
    return callback(new Error('Database not available'), null);
  }
  db.query('SELECT * FROM questions WHERE id = ?', [id], (err, results) => {
    callback(err, results[0]);
  });
};

exports.create = (title, body, author, callback) => {
  if (!db) {
    return callback(new Error('Database not available'), null);
  }
  db.query(
    'INSERT INTO questions (title, body, author, created_at) VALUES (?, ?, ?, NOW())',
    [title, body, author],
    (err, result) => {
      callback(err, result);
    }
  );
};
