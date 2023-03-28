const md5 = require('md5');

const hashPassword = (password) => md5(password);

const verifyPassword = (passwordDB, password) => passwordDB === md5(password);

module.exports = {
  hashPassword,
  verifyPassword,
};
