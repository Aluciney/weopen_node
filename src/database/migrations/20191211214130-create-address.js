'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_city: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'city' 
        }
      },
      public_place: {
        type: Sequelize.STRING(100)
      },
      neighborhood: {
        type: Sequelize.STRING(100)
      },
      number: {
        type: Sequelize.STRING(7)
      },
      zipcode: {
        type: Sequelize.STRING(8)
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
    return queryInterface.dropTable('address');
  }
};