const boom = require('@hapi/boom');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const { sequelize } = require('../libs/sequelize');

class AuthService {

    constructor() {
        this.model = sequelize.models.User;
    }

    async logIn(body) {
        const user = await this.model.findOne({
            where: { email: body.email },
            include: ['rol']
        });
        if (!user) {
            throw boom.unauthorized('User not registered');
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) {
            throw boom.unauthorized('Invalid password');
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                rol: user.rol
            },
            config.auth.tokenSecret,
            // { expiresIn: 60 * 60 }
        );

        return { token };
    }
}

module.exports = new AuthService();