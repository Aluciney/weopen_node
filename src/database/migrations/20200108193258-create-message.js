'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('message', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_public_chat: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'public_chat' 
        }
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: 'user' 
        }
      },
      message: {
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
    return queryInterface.dropTable('message');
  }
};