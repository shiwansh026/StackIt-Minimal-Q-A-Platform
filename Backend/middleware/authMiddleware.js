const jwt = require('jsonwebtoken');

// In production, use process.env.JWT_SECRET and a .env file!
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // user object from JWT payload
    next();
  });
}

module.exports = authenticateToken;
