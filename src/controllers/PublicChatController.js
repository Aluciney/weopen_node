const { company, public_chat } = require('../app/models');

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
        const _public_chat = await public_chat.findByPk(req.params.id,{
            include: [{
                model: company,
                as: 'company'
            }],
        });
        if (_public_chat === null) {
            return res.status(404).json({ error: `Companhia não encontrado!` });
        }
        return res.status(200).json(_public_chat);
    },
};