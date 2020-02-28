'use strict';

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('company', {
        id_address: DataTypes.INTEGER,
        fantasy_name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        open_time: DataTypes.TIME,
        close_time: DataTypes.TIME,
        opening_status: DataTypes.CHAR(1),
        location: DataTypes.GEOMETRY,
        photo_url: DataTypes.STRING
    }, {});
    company.associate = function (models) {
        // Companhia tem um endereço
        company.belongsTo(models.address, {
            foreignKey: 'id_address'
        });

        company.hasMany(models.classification, {
            foreignKey: 'id_company',
            as: 'classification'
        });
    };

    sequelizePaginate.paginate(company);

    return company;
};