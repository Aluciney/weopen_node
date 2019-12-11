const { state } = require('../app/models');

module.exports = {
    async index(req, res) {
        const states = await state.findAll();
        res.status(200).json(states);
        return res.send();
    },
};