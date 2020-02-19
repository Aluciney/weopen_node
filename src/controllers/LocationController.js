const { address, company, public_chat } = require('../app/models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    async show(req, res) {
        try {
            const _company = await company.findAll(
                { 
                    where: { [Op.or]: [{ opening_status: 'O' }, { opening_status: 'P' }] }, 
                    include: [{
                        model: address,
                        as: 'address'
                    }],
                });
            const { latitude, longitude } = req.query;
            const location = [ longitude, latitude ];
            let chats = [];
            for( var i = 0; i < _company.length; i++){
                if (isPointInPoly( _company[i].location, location)) {
                    const { id } = await public_chat.findOne({ where: { id_company: _company[i].id } });
                    
                    const chat =
                    {
                        id_public_chat: id,
                        id_company: _company[i].id,
                        fantasy_name: _company[i].fantasy_name,
                        address: _company[i].address,
                        situation: _company[i].opening_status,
                        open_time: _company[i].open_time,
                        close_time: _company[i].close_time,
                        photo_url: _company[i].photo_url,
                    };

                    chats.push(chat);
                    break;
                }
            }
            return res.status(200).json(chats);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao verificar endereço. Erro: ${error}` });
        }
    },

    
};

function isPointInPoly(poly, pt) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1]))
            && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
            && (c = !c);
    return c;
}