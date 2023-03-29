const { infoLoginSchema, infoUserSchema } = require('./schemas');
const errorGenerator = require('../../Utils/errorGenerator');

const validatorFieldsLogin = (infoLogin) => {
  const { error } = infoLoginSchema.validate(infoLogin);
  if (error) {
    errorGenerator(422, error.message);
  }
  return null;
};

const validatorFieldsRegister = (infoUser) => {
  const { error } = infoUserSchema.validate(infoUser);
  if (error) {
    errorGenerator(400, error.message);
  }
  return null;
};

module.exports = {
  validatorFieldsLogin,
  validatorFieldsRegister,
};
