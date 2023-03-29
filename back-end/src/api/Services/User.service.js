const { User } = require('../../database/models');
const { verifyPassword, hashPassword } = require('../Utils/md5');
const { generateToken } = require('../Utils/jwt');
const {
  validatorFieldsLogin,
  validatorFieldsRegister,
} = require('./validators/validatorFunctions');
const errorGenerator = require('../Utils/errorGenerator');

const getUser = async (param) => {
  const user = await User.findOne({ where: param });
  return user;
};

const login = async (loginInfo) => {
  validatorFieldsLogin(loginInfo);
  const { email, password } = loginInfo;
  const user = getUser({ email });
  
  if (!user) {
    errorGenerator(404, 'Not found');
  }
  const {
    dataValues: { password: passwordDB, ...rest },
  } = user;
  if (!verifyPassword(passwordDB, password)) {
    errorGenerator(404, 'email or password is invalid');
  }
  const token = generateToken(rest);
  return token;
};

const register = async (userInfo) => {
  validatorFieldsRegister(userInfo);

  const { password, email, name, role } = userInfo;

  const userEmail = await getUser({ email });
  const userName = await getUser({ name });

  if (userEmail || userName) {
    errorGenerator(409, 'User already registered');
  }

  const encript = hashPassword(password);
  const userInforEncripted = { password: encript, email, name, role };
  
  const result = await User.create(userInforEncripted);

  return result;
};

module.exports = {
  login,
  register,
};
