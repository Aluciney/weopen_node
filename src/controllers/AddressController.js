const { address } = require('../app/models');

module.exports = {
    async index(req, res) {
        const addresses = await address.findAll();
        res.status(200).json(addresses);
        return res.send();
    },

    async show(req, res) {
        const addresses = await address.findByPk(req.params.id);
        if (addresses === null) {
            return res.status(404).json({ error: `Endereço não encontrado!` });
        }
        return res.status(200).json(addresses);
    },

    async store(req, res) {
        try {
            const addresses = await address.create(req.body);
            res.status(201).json(addresses);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao cadastrar endereço. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const addresses = await address.update(req.body, { where: { id: req.params.id } });
            if (addresses > 0) {
                return res.json(await address.findByPk(req.params.id));
            }
            return res.status(404).json({ error: `Erro ao atualizar endereço.` });
        } catch (error) {
            return res.status(404).json({ error: `Erro ao atualizar endereço. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const addresses = await address.destroy({ where: { id: req.params.id } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar endereço. Erro: ${error}` });
        }
    }
};