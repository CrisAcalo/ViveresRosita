'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'MacBook Pro M2',
        description: 'Laptop de alto rendimiento con chip Apple M2, ideal para profesionales y creadores de contenido.',
        price: 1999.99,
        stock: 10,
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
        category_id: 1 // Laptops
      },
      {
        name: 'Dell XPS 13',
        description: 'Ultrabook con pantalla InfinityEdge, Intel Core i7 y SSD de 512GB.',
        price: 1599.99,
        stock: 15,
        image: 'https://images.pexels.com/photos/374707/pexels-photo-374707.jpeg',
        category_id: 1 // Laptops
      },
      {
        name: 'iPhone 14 Pro',
        description: 'El smartphone más avanzado de Apple con pantalla Super Retina XDR y Dynamic Island.',
        price: 1199.99,
        stock: 25,
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
        category_id: 2 // Smartphones
      },
      {
        name: 'Samsung Galaxy S23 Ultra',
        description: 'Smartphone con cámara de 200 MP, pantalla AMOLED de 120 Hz y procesador Snapdragon 8 Gen 2.',
        price: 1099.99,
        stock: 20,
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
        category_id: 2 // Smartphones
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria y hasta 30 horas de batería.',
        price: 349.99,
        stock: 30,
        image: 'https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg',
        category_id: 3 // Auriculares
      },
      {
        name: 'Logitech G Pro X',
        description: 'Auriculares gaming con sonido envolvente 7.1 y micrófono Blue VO!CE.',
        price: 199.99,
        stock: 40,
        image: 'https://images.pexels.com/photos/3394659/pexels-photo-3394659.jpeg',
        category_id: 3 // Auriculares
      },
      {
        name: 'PlayStation 5',
        description: 'Consola de nueva generación con SSD ultrarrápido y tecnología de trazado de rayos.',
        price: 499.99,
        stock: 50,
        image: 'https://images.pexels.com/photos/3945658/pexels-photo-3945658.jpeg',
        category_id: 4 // Consolas y Videojuegos
      },
      {
        name: 'Xbox Series X',
        description: 'La consola más potente de Microsoft con 12 teraflops de potencia gráfica.',
        price: 499.99,
        stock: 50,
        image: 'https://images.pexels.com/photos/3945658/pexels-photo-3945658.jpeg',
        category_id: 4 // Consolas y Videojuegos
      },
      {
        name: 'LG UltraFine 5K',
        description: 'Monitor de alta resolución con tecnología True Tone y compatibilidad con Mac.',
        price: 1299.99,
        stock: 10,
        image: 'https://images.pexels.com/photos/374707/pexels-photo-374707.jpeg',
        category_id: 5 // Monitores
      },
      {
        name: 'ASUS ROG Swift PG32UQX',
        description: 'Monitor gaming 4K HDR con 144 Hz y G-Sync Ultimate.',
        price: 1799.99,
        stock: 12,
        image: 'https://images.pexels.com/photos/374707/pexels-photo-374707.jpeg',
        category_id: 5 // Monitores
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
