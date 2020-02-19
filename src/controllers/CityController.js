const { city, state } = require('../app/models');

module.exports = {
    async index(req, res) {
        const cities = await city.findAll({
            include: [{
                model: state,
                as: 'state'
            }],
        });
        res.status(200).json(cities);
        return res.send();
    },

    async show(req, res) {
        const cities = await city.findByPk(req.params.id);
        if (cities === null) {
            return res.status(404).json({ errorMessage: `Cidade não encontrado!` });
        }
        return res.status(200).json(cities);
    },

    async store(req, res) {
        try {
            const cities = await city.create(req.body);
            return res.status(201).json(cities);
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao cadastrar cidade. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const cities = await city.update(req.body, { where: { id: req.params.id } });
            if (cities > 0) {
                return res.json(await city.findByPk(req.params.id));
            }
            return res.status(404).json({ errorMessage: `Erro ao atualizar cidade.` });
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao atualizar cidade. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const cities = await city.destroy({ where: { id: req.params.id } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao deletar cidade. Erro: ${error}` });
        }
    }
};