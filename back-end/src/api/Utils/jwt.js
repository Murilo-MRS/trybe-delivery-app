const jwt = require('jsonwebtoken');
const secret = require('./secret');

const generateToken = (payload) => jwt.sign(payload, secret);

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
