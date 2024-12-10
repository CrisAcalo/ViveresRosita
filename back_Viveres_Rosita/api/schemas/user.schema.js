const Joi = require('joi');

const id = Joi.number().integer().messages({
  'number.base': 'El ID debe ser un número entero'
});
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8);
const phone = Joi.string().pattern(/^[0-9]{10}$/).messages({
  'string.pattern.base': 'phone number must have at least 10 digits'
});
const address = Joi.string().min(5).max(50);
const rolId = Joi.number().integer().messages({
  'number.base': 'Seleccione un rol'
});

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
  address: address.required(),
  rolId: rolId.required()
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  phone: phone,
  address: address,
  rolId: rolId
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };