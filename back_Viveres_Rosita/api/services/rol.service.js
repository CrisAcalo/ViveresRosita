const { sequelize } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class RolService {

    constructor() {
        this.model = sequelize.models.Rol;
    }

    async generate() {
    }

    async create(body) {
        const newRol = await this.model.create(body);
        return newRol;
    }

    async find() {
        const rta = await this.model.findAll();
        return rta;
    }

    async findOne(id) {
        const rol = await this.model.findByPk(id,
            {
                include: ['users']
            }
        );
        if (!rol) {
            throw boom.notFound('Rol not found');
        } else {
            return rol;
        }
    }

    async update(id, changes) {
        const rol = await this.findOne(id);
        if (!rol) {
            throw boom.notFound('Rol not found');
        } else {
            const rta = await rol.update(changes);
            return rta;
        }
    }

    async delete(id) {
        const rol = await this.findOne(id);
        if (!rol) {
            throw boom.notFound('Rol not found');
        } else {
            await rol.destroy();
            return {
                id,
                message: 'Rol deleted',
            }
        }
    }

}

module.exports = RolService;