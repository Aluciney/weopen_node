const { country } = require('../app/models');

module.exports = {
    async index(req, res) {
        const countries = await country.findAll();
        res.status(200).json(countries);
        return res.send();
    },

    async show(req, res) {
        const countries = await country.findByPk(req.params.id);
        if (countries === null) {
            return res.status(404).json({ errorMessage: `Paiz não encontrado!` });
        }
        return res.status(200).json(countries);
    },

    async store(req, res) {
        try {
            const countries = await country.create(req.body);
            res.status(201).json(countries);
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao cadastrar paiz. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const countries = await country.update(req.body, { where: { id: req.params.id } });
            if (countries > 0) {
                return res.json(await country.findByPk(req.params.id));
            }
            return res.status(404).json({ errorMessage: `Erro ao atualizar paiz.` });
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao atualizar paiz. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const countries = await country.destroy({ where: { id: req.params.id } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao deletar paiz. Erro: ${error}` });
        }
    }
};