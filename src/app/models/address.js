'use strict';
module.exports = (sequelize, DataTypes) => {
    const address = sequelize.define('address', {
        id_city: DataTypes.INTEGER,
        public_place: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        number: DataTypes.STRING,
        zipcode: DataTypes.STRING
    }, {});
    address.associate = function (models) {
        // Endereço tem um cidade
        address.belongsTo(models.city, {
            foreignKey: 'id_city'
        });
    };

    return address;
};