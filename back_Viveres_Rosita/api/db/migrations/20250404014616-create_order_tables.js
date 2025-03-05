'use strict';

const { ORDER_TABLE, OrderSchema } = require('../models/order.model');
const { ORDER_ITEM_TABLE, OrderItemSchema } = require('../models/order_items.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_ITEM_TABLE, OrderItemSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_ITEM_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
