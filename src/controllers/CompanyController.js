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
            where: { 
                fantasy_name: { [Op.iLike]: `%${search}%` },
                opening_status: {
                    [Op.ne]: 'C',
                }
            },
            order: [
                ['fantasy_name', 'ASC'],
            ],
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
};