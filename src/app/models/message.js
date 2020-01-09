'use strict';
module.exports = (sequelize, DataTypes) => {
    const message = sequelize.define('message', {
        id_public_chat: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        message: DataTypes.STRING
    }, {});
    message.associate = function (models) {
        // Mensagem tem um chat_publico
        message.belongsTo(models.public_chat, {
            foreignKey: 'id_public_chat'
        });
        // Mensagem tem um usuario
        message.belongsTo(models.user, {
            foreignKey: 'id_user'
        });
    };
    return message;
};