const { user } = require('../app/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        const users = await user.findAll();
        res.status(200).json(users);
        return res.send();
    },

    async show(req, res) {
        const _user = await user.findByPk(req.params.id);
        if (_user === null) {
            return res.status(404).json({ errorMessage: `Usuário não encontrado!` });
        }
        return res.status(200).json(_user);
    },

    async store(req, res) {
        try {
            const { name, email, password, avatar_url } = req.body;
            var password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const _user = await user.create({
                name,
                email, 
                password_hash, 
                avatar_url
            });

            var token = jwt.sign({ id: _user.id }, process.env.JWT_SECRET_KEY);

            return res.status(201).json({ user: _user, token: token });
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao cadastrar usuario. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const _user = await user.update(req.body, { where: { id: req.userId } });
            if (_user > 0) {
                return res.json(await user.findByPk(req.userId));
            }
            return res.status(404).json({ errorMessage: `Erro ao atualizar usuario.` });
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao atualizar usuario. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const _user = await user.findByPk(req.userId);
            await user.destroy({ where: { id: req.userId } });
            return res.send();
        } catch (error) {
            return res.status(404).json({ errorMessage: `Erro ao deletar usuario. Erro: ${error}` });
        }
    }
};