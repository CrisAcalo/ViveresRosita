const { User, UserSchema } = require('./user.model');
const { Rol, RolSchema } = require('./rol.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderItem, OrderItemSchema } = require('./order_items.model');
const { Carrier, CarrierSchema } = require('./carrier.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize)); // inicializa el modelo User
  Rol.init(RolSchema, Rol.config(sequelize)); // inicializa el modelo Rol
  Product.init(ProductSchema, Product.config(sequelize)); // inicializa el modelo Product
  Category.init(CategorySchema, Category.config(sequelize)); // inicializa el modelo Category
  Order.init(OrderSchema, Order.config(sequelize)); // inicializa el modelo Order
  OrderItem.init(OrderItemSchema, OrderItem.config(sequelize)); // inicializa el modelo OrderItem
  Carrier.init(CarrierSchema, Carrier.config(sequelize)); // inicializa el modelo Carrier

  User.associate(sequelize.models); // asocia el modelo User con el modelo Customer
  Rol.associate(sequelize.models); // asocia el modelo Rol con el modelo User
  Product.associate(sequelize.models); // asocia el modelo Product con el modelo Category
  Category.associate(sequelize.models); // asocia el modelo Category con el modelo Product
  Order.associate(sequelize.models); // asocia el modelo Order con el modelo User
  OrderItem.associate(sequelize.models); // asocia el modelo OrderItem con el modelo Order
  Carrier.associate(sequelize.models); // asocia el modelo Carrier con el modelo Order
}

module.exports = { setupModels };
