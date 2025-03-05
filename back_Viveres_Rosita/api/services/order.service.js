const { sequelize } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
    constructor() {
        this.Order = sequelize.models.Order;
        this.OrderItem = sequelize.models.OrderItem;
        this.Product = sequelize.models.Product;
        this.Carrier = sequelize.models.Carrier;
    }

    async create(body) {
        //antes de crear la orden se debe verificar que los productos existan
        //y que la cantidad solicitada no sea mayor a la cantidad en inventario
        //y asignar a currierId aleatoriamente un transportista los que existan en la tabla carriers

        const products = body.orderItems.map(orderItem => orderItem.productId);
        const productsFound = await this.Product.findAll({
            where: {
                id: products
            }
        });

        if (productsFound.length !== products.length) {
            throw boom.badRequest('Some products not found');
        }

        for (let i = 0; i < productsFound.length; i++) {
            if (productsFound[i].stock < body.orderItems[i].quantity) {
                throw boom.badRequest('Some products are out of stock');
            }
        }

        const carriers = await this.Carrier.findAll();
        const carrier = carriers[Math.floor(Math.random() * carriers.length)];

        const order = await this.Order.create({
            ...body,
            carrierId: carrier.id
        }, {
            include: ['orderItems']
        });

        for (let i = 0; i < productsFound.length; i++) {
            await productsFound[i].update({
                stock: productsFound[i].stock - body.orderItems[i].quantity
            });
        }

        return order;
    }

    async find() {
        return this.Order.findAll({
            include: [
                {
                    model: this.OrderItem,
                    as: 'orderItems',
                    include: ['product']
                },
                'user',
                'carrier'
            ]
        });
    }

    async findOne(id) {
        const order = await this.Order.findByPk(id, {
            include: [
                {
                    model: this.OrderItem,
                    as: 'orderItems',
                    include: ['product']
                },
                'user',
                'carrier'
            ]
        });
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async findLast() {
        return this.Order.findOne({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: this.OrderItem,
                    as: 'orderItems',
                    include: ['product']
                },
                'user',
                'carrier'
            ]
        });
    }

    async updateState(id, body) {
        const order = await this.findOne(id);
        if (body.state === "Cancelado") {
            const orderItems = await this.OrderItem.findAll({
                where: {
                    orderId: id
                }
            });
            for (let i = 0; i < orderItems.length; i++) {
                const product = await this.Product.findByPk(orderItems[i].productId);
                await product.update({
                    stock: product.stock + orderItems[i].quantity
                });
            }
        }

        return order.update(body);
    }

    async delete(id) {
        //Eliminar order_items asociados y luego la orden
        const order = await this.findOne(id);
        await this.OrderItem.destroy({
            where: {
                orderId: id
            }
        });
        await order.destroy();
        return { id };
    }
}

module.exports = new OrderService(); // para que exista una sola instancia