// id (Primary Key)
// order_id (Foreign Key a Orders)
// product_id (Foreign Key a Products)
// quantity (Integer)

const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');

const { PRODUCT_TABLE } = require('./product.model');

const ORDER_ITEM_TABLE = 'order_items';

const OrderItemSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'order_id',
        references: {
            model: ORDER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
            model: PRODUCT_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    }
}

class OrderItem extends Model {
    static associate(models) {
        this.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orderId'
        });

        this.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_ITEM_TABLE,
            modelName: 'OrderItem',
            timestamps: false,
        }
    }
}

module.exports = { OrderItem, OrderItemSchema, ORDER_ITEM_TABLE };