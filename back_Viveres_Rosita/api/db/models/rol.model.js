const { Model, DataTypes } = require('sequelize');

const ROL_TABLE = 'roles';

const RolSchema = {
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
};

class Rol extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      as: 'users',
      foreignKey: 'rolId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_TABLE,
      modelName: 'Rol',
      timestamps: false,
    };
  }
}

module.exports = { ROL_TABLE, Rol, RolSchema };
