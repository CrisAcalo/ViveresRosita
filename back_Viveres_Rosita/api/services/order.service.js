const { sequelize } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
    constructor() {
        this.Order = sequelize.models.Order;
        this.OrderItem = sequelize.models.OrderItem;
    }

    async create(body) {
        return this.Order.create(body,
            {
                include: ['orderItems']
            }
        );
    }

    async find() {
        return this.Order.findAll();
    }

    async findOne(id) {
        const order = await this.Order.findByPk(id, {
            include: [
                {
                    model: this.OrderItem,
                    as: 'orderItems',
                    include: ['product']
                },
                'user'
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
                'user'
            ]
        });
    }

    async delete(id) {
        const order = await this.findOne(id);
        await order.destroy();
        return { id };
    }
}

module.exports = new OrderService(); // para que exista una sola instancia