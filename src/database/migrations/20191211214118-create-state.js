'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('state', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_country: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'country' 
        }
      },
      name: {
        type: Sequelize.STRING(100)
      },
      uf: {
        type: Sequelize.STRING(2)
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
    return queryInterface.dropTable('state');
  }
};