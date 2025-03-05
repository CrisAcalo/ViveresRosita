const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');
const OrdersService = require('../services/order.service');
const { createOrderSchema, getOrderSchema, updateStateSchema } = require('../schemas/order.schema');

const router = express.Router();

router.get('/',
    async (req, res) => {
        const orders = await OrdersService.find();
        res.json(orders);
    }
);

router.get('/last', async (req, res, next) => {
    try {
        const order = await OrdersService.findLast();
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const order = await OrdersService.findOne(id);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        try {
            const newOrder = await OrdersService.create(body);
            res.status(201).json({
                message: 'created',
                data: newOrder,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getOrderSchema, 'params'),
    validatorHandler(updateStateSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const order = await OrdersService.updateState(id, body);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            await OrdersService.delete(id);
            res.status(200).json({ id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;