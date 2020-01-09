const { state, country } = require('../app/models');

module.exports = {
    async index(req, res) {
        const states = await state.findAll({
            include: [{
                model: country,
                as: 'country'
            }],
        });
        res.status(200).json(states);
        return res.send();
    },
    
    async show(req, res) {
        const states = await state.findByPk(req.params.id);
        if (states === null) {
            return res.status(404).json({ erroMessage: `Estado não encontrado!` });
        }
        return res.status(200).json(states);
    },

    async store(req, res) {
        try {
            const states = await state.create(req.body);
            res.status(201).json(states);
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao cadastrar estado. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const states = await state.update(req.body, { where: { id: req.params.id } });
            if (states > 0) {
                return res.json(await state.findByPk(req.params.id));
            }
            return res.status(404).json({ erroMessage: `Erro ao atualizar estado.` });
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao atualizar estado. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const states = await state.destroy({ where: { id: req.params.id } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao deletar estado. Erro: ${error}` });
        }
    }
};