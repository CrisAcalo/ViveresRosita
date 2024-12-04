const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().max(100);

const createRolSchema = Joi.object({
    name: name.required(),
});

const updateRolSchema = Joi.object({
    name: name,
});

const getRolSchema = Joi.object({
    id: id.required(),
});

module.exports = { createRolSchema, updateRolSchema, getRolSchema };