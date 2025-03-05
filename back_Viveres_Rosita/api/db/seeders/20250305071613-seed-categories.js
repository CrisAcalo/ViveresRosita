'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Laptops',
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
        description: 'Laptops de última generación para trabajo, estudio y gaming.'
      },
      {
        name: 'Smartphones',
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
        description: 'Los últimos modelos de smartphones con la mejor tecnología.'
      },
      {
        name: 'Auriculares',
        image: 'https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg',
        description: 'Auriculares inalámbricos y con cable para música y gaming.'
      },
      {
        name: 'Consolas y Videojuegos',
        image: 'https://images.pexels.com/photos/3945658/pexels-photo-3945658.jpeg',
        description: 'Consolas de videojuegos y accesorios para gamers.'
      },
      {
        name: 'Monitores',
        image: 'https://images.pexels.com/photos/374707/pexels-photo-374707.jpeg',
        description: 'Pantallas de alta resolución para diseñadores, gamers y profesionales.'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      name: [
        'Laptops',
        'Smartphones',
        'Auriculares',
        'Consolas y Videojuegos',
        'Monitores'
      ]
    }, {});
  }
};
