const { address, company, public_chat } = require('../app/models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    async show(req, res) {
        try {
            const { latitude, longitude } = req.query;
            const chats = [];
            var intersects = sequelize.fn('ST_Intersects', 'POINT(' + longitude + ' ' + latitude +')', sequelize.col('location'));
            const _company = await company.findOne(
                {
                    where: { 
                        $and: sequelize.where(intersects, true)
                    }, 
                    include: [{
                        model: address,
                        as: 'address'
                    }],
                });
            if(_company){
                const { id } = await public_chat.findOne({ where: { id_company: _company.id } });
                chats.push({
                    id_public_chat: id,
                    id_company: _company.id,
                    fantasy_name: _company.fantasy_name,
                    address: _company.address,
                    situation: _company.opening_status,
                    open_time: _company.open_time,
                    close_time: _company.close_time,
                    photo_url: _company.photo_url,
                });
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