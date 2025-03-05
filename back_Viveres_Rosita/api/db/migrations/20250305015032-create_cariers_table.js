'use strict';

const { CARRIER_TABLE, CarrierSchema } = require('../models/carrier.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CARRIER_TABLE, CarrierSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CARRIER_TABLE);
  }
};
