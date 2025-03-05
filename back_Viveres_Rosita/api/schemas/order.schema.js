// id (Primary Key)
// user_id (Foreign Key a Users)

const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();

// const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().integer();

const createOrderSchema = Joi.object({
    userId: userId.required(),
    orderItems: Joi.array().items(Joi.object({
        productId: productId.required(),
        quantity: quantity.required(),
    })).required(),
});

const getOrderSchema = Joi.object({
    id: id.required(),
});


const updateStateSchema = Joi.object({
    state: Joi.string().valid('Pendiente', 'Enviado', 'Entregado', 'Cancelado').required(),
});

module.exports = { createOrderSchema, getOrderSchema, updateStateSchema };