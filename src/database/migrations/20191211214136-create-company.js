'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_address: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'address' 
        }
      },
      fantasy_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      cnpj: {
        allowNull: false,
        type: Sequelize.STRING(14)
      },
      open_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      close_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      opening_status: {
        allowNull: false,
        type: Sequelize.ENUM('O','C','P')
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('company');
  }
};