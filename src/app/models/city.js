'use strict';
module.exports = (sequelize, DataTypes) => {
    const city = sequelize.define('city', {
        id_state: DataTypes.INTEGER,
        name: DataTypes.STRING,
    }, {});
    city.associate = function (models) {
        // Cidade tem um estado
        city.belongsTo(models.state, {
            foreignKey: 'id_state'
        });
    };

    return city;
};