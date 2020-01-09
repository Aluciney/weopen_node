const { company, message, user } = require('../app/models');

module.exports = {
    async show(req, res) {
        const { id_public_chat } = req.params;
        const messages = await message.findAll({ 
            where: { id_public_chat },
            include: [{
                model: user,
                as: 'user'
            }],
        });
        _messages = [];
        messages.map( message => {
            _messages.push({
                _id: message.id,
                text: message.message,
                createdAt: message.createdAt,
                user: {
                    _id: message.user.id,
                    name: message.user.name,
                    avatar: message.user.image,
                },
            });
        });
        return res.status(200).json(_messages);
    },

    async store(req, res) {
        try {
            const _message = await message.create(req.body);
            return res.status(201).json([]);
        } catch (error) {
            return res.status(404).json({ erroMessage: `Erro ao enviar mensagem. Erro: ${error}` });
        }
    },
};