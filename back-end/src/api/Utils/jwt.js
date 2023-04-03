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

const decodeToken = (token) => jwt.decode(token, secret);

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
