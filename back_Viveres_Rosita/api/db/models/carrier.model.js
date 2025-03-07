const { Model, DataTypes, Sequelize } = require('sequelize');

const CARRIER_TABLE = 'carriers';

const CarrierSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    website: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('now'),
    },
};

class Carrier extends Model {
    static associate(models) {
        this.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'carrierId',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CARRIER_TABLE,
            modelName: 'Carrier',
            timestamps: false,
        };
    }
}

module.exports = { CARRIER_TABLE, Carrier, CarrierSchema };
