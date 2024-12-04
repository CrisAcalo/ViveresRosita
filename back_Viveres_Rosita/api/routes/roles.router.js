const express = require('express');

const RolService = require('../services/rol.service');

const {
    createRolSchema,
    updateRolSchema,
    getRolSchema,
} = require('../schemas/rol.schema');

const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();

const rolService = new RolService();

router.get('/', async (req, res) => {
    const roles = await rolService.find();
    res.json(roles);
}
);

router.get('/:id',
    validatorHandler(getRolSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const rol = await rolService.findOne(id);
            res.json(rol);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createRolSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        try {
            const newRol = await rolService.create(body);
            res.status(201).json(newRol);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getRolSchema, 'params'),
    validatorHandler(updateRolSchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params;
        const changes = req.body;
        try {
            const rol = await rolService.update(id, changes);
            res.json(rol);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getRolSchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            await rolService.delete(id);
            res.json({ id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;