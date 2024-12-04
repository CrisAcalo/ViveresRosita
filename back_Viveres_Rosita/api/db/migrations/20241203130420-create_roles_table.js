'use strict';

const { ROL_TABLE, RolSchema } = require('../models/rol.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ROL_TABLE, RolSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ROL_TABLE);
  }
};
