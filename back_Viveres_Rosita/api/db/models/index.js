const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize)); // inicializa el modelo User
  Product.init(ProductSchema, Product.config(sequelize)); // inicializa el modelo Product
  Category.init(CategorySchema, Category.config(sequelize)); // inicializa el modelo Category

  User.associate(sequelize.models); // asocia el modelo User con el modelo Customer
  Product.associate(sequelize.models); // asocia el modelo Product con el modelo Category
  Category.associate(sequelize.models); // asocia el modelo Category con el modelo Product
}

module.exports = { setupModels };
