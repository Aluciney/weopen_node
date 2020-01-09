'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_company = sequelize.define('user_company', {
    id_user: DataTypes.NUMBER
  }, {});
  user_company.associate = function(models) {
    // Usuario_Companhia tem um usuario
    user_company.belongsTo(models.user, {
        foreignKey: 'id_user'
    });
  };
  return user_company;
};