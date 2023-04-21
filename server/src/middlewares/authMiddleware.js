const jwt = require('jsonwebtoken');
const config = require('../configuration');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Auth failed: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Auth failed: Invalid token' });
  }
};

module.exports = authMiddleware;
