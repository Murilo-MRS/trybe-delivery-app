const Joi = require('joi');

const email = Joi.string().email().required().label('email');
const password = Joi.string().min(6).required().label('password');

const infoLoginSchema = Joi.object({
  email,
  password,
});

const infoUserSchema = Joi.object({
  name: Joi.string().min(12).required().label('name'),
  email,
  password,
  role: Joi.string().required().label('role'),
});

module.exports = {
  infoLoginSchema,
  infoUserSchema,
};
