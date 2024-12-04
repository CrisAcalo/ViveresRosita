const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');
const OrdersService = require('../services/order.service');
const { createOrderSchema, getOrderSchema, createOrderItemSchema } = require('../schemas/order.schema');

const router = express.Router();

router.get('/',
    async (req, res) => {
        const orders = await OrdersService.find();
        res.json(orders);
    }
);

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

// router.post('/:id/items',
//     validatorHandler(getOrderSchema, 'params'),
//     validatorHandler(createOrderItemSchema, 'body'),
//     async (req, res, next) => {
//         const { id } = req.params;
//         const items = req.body;
//         try {
//             const orderItems = await OrdersService.addItems(id, items);
//             res.status(201).json({
//                 message: 'created',
//                 data: orderItems,
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
// );

// router.delete('/:id/items/:itemId',
//     validatorHandler(getOrderSchema, 'params'),
//     validatorHandler(getOrderItemSchema, 'params'),
//     async (req, res, next) => {
//         const { id, itemId } = req.params;
//         try {
//             await OrdersService.deleteItem(id, itemId);
//             res.status(200).json({ id, itemId });
//         } catch (error) {
//             next(error);
//         }
//     }
// );

module.exports = router;