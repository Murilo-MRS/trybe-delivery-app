const { verifyToken, decodeToken } = require('../Utils/jwt');

const ValidToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const isValid = verifyToken(token);
  if (!isValid) return res.status(401).json({ message: 'Invalid Token' });
  next();
};

const validTokenAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const isValid = verifyToken(token);
  if (!isValid) return res.status(401).json({ message: 'Invalid Token' });
  const { role } = decodeToken(token);
  if (role !== 'administrator') return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = {
  ValidToken,
  validTokenAdmin,
};