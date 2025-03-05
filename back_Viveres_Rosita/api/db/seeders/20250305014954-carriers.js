'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('carriers', [
      { id: 1, name: 'Qwintry', country: 'Ecuador', website: 'https://qwintry.com', phone: '+593 123 456 789', createdAt: new Date() },
      { id: 2, name: 'Servientrega International', country: 'Ecuador', website: 'https://servientrega.com', phone: '+593 987 654 321', createdAt: new Date() },
      { id: 3, name: 'Tiendamia', country: 'Ecuador', website: 'https://tiendamia.com', phone: '+593 555 666 777', createdAt: new Date() },
      { id: 4, name: 'Encarguelo.com.ec', country: 'Ecuador', website: 'https://encarguelo.com.ec', phone: '+593 888 999 000', createdAt: new Date() },
      { id: 5, name: 'Siatibox', country: 'Ecuador', website: 'https://siatibox.com', phone: '+593 111 222 333', createdAt: new Date() },
      { id: 6, name: 'Ecucompras', country: 'Ecuador', website: 'https://ecucompras.com', phone: '+593 444 555 666', createdAt: new Date() },
      { id: 7, name: 'Shipito', country: 'Ecuador', website: 'https://shipito.com', phone: '+593 777 888 999', createdAt: new Date() },
      { id: 8, name: 'FedEx Ecuador', country: 'Ecuador', website: 'https://fedex.com/ec', phone: '+593 112 223 334', createdAt: new Date() },
      { id: 9, name: 'TMALOGISTICS S.A.', country: 'Ecuador', website: 'https://tmalogistics.com', phone: '+593 334 445 556', createdAt: new Date() },
      { id: 10, name: 'Mercado Libre Ecuador', country: 'Ecuador', website: 'https://mercadolibre.com.ec', phone: '+593 556 667 778', createdAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carriers', null, {});
  }
};
