'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Lista de estados permitidos
    const orderStates = ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'];

    // IDs de los usuarios que harán órdenes (sin incluir admin)
    const userIds = [2, 3, 4, 5, 6]; // Asegúrate de que estos IDs existen en tu BD

    // IDs de los carriers disponibles (simulados)
    const carrierIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Crear órdenes
    const orders = [];

    userIds.forEach(userId => {
      for (let i = 0; i < 4; i++) { // Mínimo 4 órdenes por usuario
        orders.push({
          user_id: userId,
          state: orderStates[Math.floor(Math.random() * orderStates.length)], // Estado aleatorio
          carrier_id: carrierIds[Math.floor(Math.random() * carrierIds.length)], // Carrier aleatorio
        });
      }
    });

    await queryInterface.bulkInsert('orders', orders, {});

    // Obtener las órdenes insertadas
    const insertedOrders = await queryInterface.sequelize.query(
      `SELECT id FROM orders;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Crear ítems de órdenes
    const orderItems = [];
    const productIds = [1, 2, 3, 4, 5, 6]; // Asegúrate de que estos productos existen

    insertedOrders.forEach(order => {
      const numItems = Math.floor(Math.random() * 3) + 1; // Entre 1 y 3 productos por orden
      for (let i = 0; i < numItems; i++) {
        orderItems.push({
          order_id: order.id,
          product_id: productIds[Math.floor(Math.random() * productIds.length)], // Producto aleatorio
          quantity: Math.floor(Math.random() * 3) + 1, // Cantidad entre 1 y 3
        });
      }
    });

    await queryInterface.bulkInsert('order_items', orderItems, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_items', null, {});
    await queryInterface.bulkDelete('orders', null, {});
  }
};
