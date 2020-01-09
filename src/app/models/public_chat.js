'use strict';
module.exports = (sequelize, DataTypes) => {
    const public_chat = sequelize.define('public_chat', {
        id_company: DataTypes.INTEGER
    }, {});
    public_chat.associate = function (models) {
        // Chat_publico tem uma companhia
        public_chat.belongsTo(models.company, {
            foreignKey: 'id_company'
        });
    };
    return public_chat;
};