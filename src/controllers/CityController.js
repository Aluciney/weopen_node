const { city, state } = require('../app/models');

module.exports = {
    async index(req, res) {
        const cities = await city.findAll({
            include: [{
                model: state,
                as: 'state'
            }],
        });
        res.status(200).json(cities);
        return res.send();
    },

    // async show(req, res) {
    //     const _user = await user.findByPk(req.params.id);
    //     if (_user != null) {
    //         return res.status(200).json(_user);
    //     } else {
    //         return res.status(404).json({ erroMessage: `Usuário não encontrado!` });
    //     }
    // },

    // async store(req, res) {
    //     try {
    //         const _user = await user.create(req.body);
    //         var token = jwt.sign({ id: _user.id }, process.env.JWT_SECRET_KEY);
    //         res.status(200).json({ auth: true, user: _user, token: token });
    //     } catch (error) {
    //         return res.status(404).json({ erroMessage: `Erro ao cadastrar usuario. Erro: ${error}` });
    //     }
    // },

    // async update(req, res) {
    //     try {
    //         const _user = await user.update(req.body, { where: { id: req.userId } });
    //         if (_user > 0) {
    //             return res.json(await user.findByPk(req.userId));
    //         }
    //         return res.status(404).json({ erroMessage: `Erro ao atualizar usuario.` });
    //     } catch (error) {
    //         return res.status(404).json({ erroMessage: `Erro ao atualizar usuario. Erro: ${error}` });
    //     }
    // },

    // async destroy(req, res) {
    //     try {
    //         const _user = await user.findByPk(req.userId);
    //         await user.destroy({ where: { id: req.userId } });
    //         return res.send();
    //     } catch (error) {
    //         return res.status(404).json({ erroMessage: `Erro ao deletar usuario. Erro: ${error}` });
    //     }
    // }
};