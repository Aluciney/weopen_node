const { classification } = require('../app/models');

module.exports = {
    async index(req, res) {
        const classifications = await classification.findAll();
        res.status(200).json(classifications);
        return res.send();
    },

    async show(req, res) {
        const classifications = await classification.findByPk(req.params.id);
        if (classifications === null) {
            return res.status(404).json({ erroMessage: `Classificação não encontrado!` });
        }
        return res.status(200).json(classifications);
    },

    async store(req, res) {
        try {
            const classifications = await classification.create(req.body);
            res.status(201).json(classifications);
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao cadastrar classificação. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const classifications = await classification.update(req.body, { where: { id: req.params.id } });
            if (classifications > 0) {
                return res.json(await classification.findByPk(req.params.id));
            }
            return res.status(404).json({ erroMessage: `Erro ao atualizar classificação.` });
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao atualizar classificação. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const classifications = await classification.destroy({ where: { id: req.params.id } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao deletar classificação. Erro: ${error}` });
        }
    }
};