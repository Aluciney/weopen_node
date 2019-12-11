'use strict';
module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('company', {
        id_address: DataTypes.INTEGER,
        fantasy_name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        open_time: DataTypes.TIME,
        close_time: DataTypes.TIME,
        opening_status: DataTypes.ENUM('O', 'C', 'P'),
        location: DataTypes.STRING
    }, {});
    company.associate = function (models) {
        // Companhia tem um endereço
        company.belongsTo(models.address, {
            foreignKey: 'id_address'
        });
    };

    return company;
};