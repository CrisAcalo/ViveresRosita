const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const rolesRouter = require('./roles.router');
const ordersRouter = require('./orders.router');
const loginRouter = require('./auth.router');
const verifyToken = require('../middlewares/validate-token');

function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/categories', verifyToken, categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/roles', rolesRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', loginRouter);

  // Manejo de rutas no existentes
  router.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  // Manejo de métodos no permitidos
  app.use('/api/v1', (req, res) => {
    res.status(405).json({ error: `Método ${req.method} no permitido en esta ruta` });
  });
}

module.exports = routerApi;
