// id (Primary Key)
// user_id (Foreign Key a Users)
// total_price (Decimal)
// created_at (Timestamp)

const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { CARRIER_TABLE } = require('./carrier.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
            model: USER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    state: {
        allowNull: false,
        type: DataTypes.ENUM('Pendiente', 'Enviado', 'Entregado', 'Cancelado'),
        defaultValue: 'Pendiente',
    },
    carrierId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'carrier_id',
        references: {
            model: CARRIER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('now'),
    },
}

class Order extends Model {
    static associate(models) {
        // Relación con User
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId',
        });
        this.hasMany(models.OrderItem, {
            as: 'orderItems',
            foreignKey: 'orderId',
            onDelete: 'CASCADE',
        });
        this.belongsTo(models.Carrier, {
            as: 'carrier',
            foreignKey: 'carrierId',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false,
        };
    }
}


module.exports = {
    Order,
    OrderSchema,
    ORDER_TABLE
}