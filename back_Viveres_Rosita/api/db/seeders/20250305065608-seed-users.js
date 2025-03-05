'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        phone: '1234567890',
        address: 'Admin address',
        password: '$2a$10$UiaS/Zyt1AyxnZ11ZUNql.N8HN9eSUJazWAg/BmcIWdkTn/18JiTy',
        rol_id: 1
      },
      {
        name: 'Carlos Pérez',
        email: 'carlos.perez@example.com',
        phone: '0987654321',
        address: 'Av. Los Rosales 123, Quito',
        password: '$2a$10$UiaS/Zyt1AyxnZ11ZUNql.N8HN9eSUJazWAg/BmcIWdkTn/18JiTy', // Simulación de hash
        rol_id: 3
      },
      {
        name: 'María González',
        email: 'maria.gonzalez@example.com',
        phone: '0991234567',
        address: 'Calle 45 #12-34, Guayaquil',
        password: '$2a$10$UiaS/Zyt1AyxnZ11ZUNql.N8HN9eSUJazWAg/BmcIWdkTn/18JiTy',
        rol_id: 3
      },
      {
        name: 'Javier López',
        email: 'javier.lopez@example.com',
        phone: '0976543210',
        address: 'Barrio La Pradera, Cuenca',
        password: '$2a$10$UiaS/Zyt1AyxnZ11ZUNql.N8HN9eSUJazWAg/BmcIWdkTn/18JiTy',
        rol_id: 3
      },
      {
        name: 'Sofía Ramírez',
        email: 'sofia.ramirez@example.com',
        phone: '0961122334',
        address: 'Calle Amazonas 321, Loja',
        password: '$2a$10$UiaS/Zyt1AyxnZ11ZUNql.N8HN9eSUJazWAg/BmcIWdkTn/18JiTy',
        rol_id: 3
      },
      {
        name: 'Andrés Castillo',
        email: 'andres.castillo@example.com',
        phone: '0955566778',
        address: 'Urbanización Los Cedros, Ambato',
        password: '$2a$10$UiaS/Zyt1AyxnZ11ZUNql.N8HN9eSUJazWAg/BmcIWdkTn/18JiTy',
        rol_id: 3
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: [
        'admin@example.com',
        'carlos.perez@example.com',
        'maria.gonzalez@example.com',
        'javier.lopez@example.com',
        'sofia.ramirez@example.com',
        'andres.castillo@example.com'
      ]
    }, {});
  }
};
