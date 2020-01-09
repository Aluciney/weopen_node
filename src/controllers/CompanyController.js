const { company, address, public_chat } = require('../app/models');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const companies = await company.paginate({
            include: [{
                model: address,
                as: 'address'
            }],
            page,
            paginate: 5,
        });
        res.status(200).json(companies);
        return res.send();
    },

    async show(req, res) {
        const companies = await company.findByPk(req.params.id);
        if (companies === null) {
            return res.status(404).json({ erroMessage: `Companhia não encontrado!` });
        }
        return res.status(200).json(companies);
    },

    async store(req, res) {
        try {
            const companies = await company.create(req.body);
            const _public_chat = await public_chat.create({
                id_company: companies.id
            });
            return res.status(201).json(companies);
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao cadastrar companhia. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const companies = await company.update(req.body, { where: { id: req.params.id } });
            if (companies > 0) {
                return res.json(await company.findByPk(req.params.id));
            }
            return res.status(404).json({ erroMessage: `Erro ao atualizar companhia.` });
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao atualizar companhia. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const companies = await company.destroy({ where: { id: req.params.id } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao deletar companhia. Erro: ${error}` });
        }
    }
};