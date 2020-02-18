'use strict';
module.exports = (sequelize, DataTypes) => {
    const classification = sequelize.define('classification', {
        id_user: DataTypes.INTEGER,
        id_company: DataTypes.INTEGER,
        note: DataTypes.INTEGER
    }, {});
    classification.associate = function (models) {
        classification.belongsTo(models.company, {
            foreignKey: 'id_company'
        });
    };
    return classification;
};