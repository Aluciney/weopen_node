'use strict';
module.exports = (sequelize, DataTypes) => {
    const state = sequelize.define('state', {
        id_country: DataTypes.INTEGER,
        name: DataTypes.STRING,
        uf: DataTypes.STRING,
    }, {});
    state.associate = function (models) {
        // Estado tem um país
        state.belongsTo(models.country, {
            foreignKey: 'id_country'
        });
    };
    
    return state;
};