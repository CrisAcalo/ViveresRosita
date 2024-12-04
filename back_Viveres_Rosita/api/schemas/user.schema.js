//file schemas/product.schema.js
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8);
const phone = Joi.string().min(10).max(10);
const address = Joi.string().min(5).max(50);
const rolId = Joi.number().integer();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
  address: address.required(),
  rolId: rolId.required()
})

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  phone: phone,
  address: address,
  rolId: rolId
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }

//Json de prueba
// {
//   "name": "Juan",
//   "email": "juan@mail.com",
//   "password": "12345678",
//   "phone": "1234567890",
//   "address": "Calle 123"
// }