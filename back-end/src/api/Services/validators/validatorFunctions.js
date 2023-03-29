const { infoLoginSchema } = require('./schemas');
const errorGenerator = require('../../Utils/errorGenerator');

const validatorFieldsLogin = (infoLogin) => {
  const { error } = infoLoginSchema.validate(infoLogin);
  if (error) {
    errorGenerator(422, error.message);
  }
  return null;
};

module.exports = {
  validatorFieldsLogin,
};
