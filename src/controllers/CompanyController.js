const { company, address, public_chat, classification } = require('../app/models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    async index(req, res) {
        const { page = 1, search = '' } = req.query;
        const companies = await company.paginate({
            include: [
                {
                    model: address,
                    as: 'address'
                },
                {
                    model: classification,
                    as: 'classification'
                },
            ],
            where: { fantasy_name: { [Op.like]: `%${search}%` }},
            page,
            paginate: 5,
        });

        var result_companies = {
            docs: [],
            pages: companies.pages,
            total: companies.total,
        };

        companies.docs.map((company_, company_key) => {
            var total = company_.classification.length;
            var notes = 0;
            
            company_.classification.map((classification, classification_key) => {
                notes += classification.note;
            });

            var note =  notes / total;

            result_companies.docs.push({
                id: company_.id,
                fantasy_name: company_.fantasy_name,
                cnpj: company_.cnpj,
                open_time: company_.open_time,
                close_time: company_.close_time,
                opening_status: company_.opening_status,
                location: company_.location,
                photo_url: company_.photo_url,
                address: company_.address,
                classification: note ? note : 0,
            });
        });

        return res.status(200).json(result_companies);
    },

    async show(req, res) {
        const companies = await company.findByPk(req.params.id);
        if (companies === null) {
            return res.status(404).json({ error: `Companhia não encontrado!` });
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
            return res.status(404).json({ error: `Erro ao cadastrar companhia. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const companies = await company.update(req.body, { where: { id: req.params.id } });
            if (companies > 0) {
                return res.json(await company.findByPk(req.params.id));
            }
            return res.status(404).json({ error: `Erro ao atualizar companhia.` });
        } catch (error) {
            return res.status(404).json({ error: `Erro ao atualizar companhia. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const companies = await company.destroy({ where: { id: req.params.id } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar companhia. Erro: ${error}` });
        }
    }
};