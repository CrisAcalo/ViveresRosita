const boom = require('@hapi/boom');
const bcrypt = require("bcryptjs");

const { sequelize } = require('../libs/sequelize');

class UserService {

  constructor() {
    this.model = sequelize.models.User;
    this.Rol = sequelize.models.Rol;
  }

  async generate() {
  }

  async create(body) {

    const isEmailExist = await this.model.findOne({ where: { email: body.email } });

    if (isEmailExist) {
      throw boom.badRequest('Email already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    const newUser = await this.model.create({ ...body, password }, {
      include: ['rol']
    });

    return newUser;
  }

  async find() {
    const rta = await this.model.findAll(
      {
        include: ['rol', 'orders']
      }
    );
    return rta;
  }

  async findOne(id) {
    const user = await this.model.findByPk(id,
      {
        include: ['rol', 'orders']
      }
    );
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      return user;
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);

    const rta = await user.update(changes);
    return rta;

  }

  async delete(id) {
    const user = await this.findOne(id);

    await user.destroy();
    return {
      id,
      message: 'User deleted',
    }
  }
}

module.exports = UserService;
