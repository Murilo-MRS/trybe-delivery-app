const Joi = require('joi');

const infoLoginSchema = Joi.object({
  email: Joi.string().email().required().label('email'),
  password: Joi.string().min(6).required().label('password'),
});

module.exports = {
  infoLoginSchema,
};
