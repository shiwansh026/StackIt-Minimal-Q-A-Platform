const db = require('./db');

exports.findByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    callback(err, results[0]);
  });
};

exports.create = (username, password, callback) => {
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback);
};
