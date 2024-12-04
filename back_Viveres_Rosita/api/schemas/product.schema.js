const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(25);
const description = Joi.string().min(10).max(200);
const price = Joi.number();
const stock = Joi.number().integer().min(0);
const image = Joi.string().uri();
const categoryId = Joi.number().integer().min(1).max(5);

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  image: image.required(),
  categoryId: categoryId.required(),
})

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  stock: stock,
  image: image,
  categoryId: categoryId,
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
