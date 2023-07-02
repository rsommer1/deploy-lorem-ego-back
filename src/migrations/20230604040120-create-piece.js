'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pieces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameid: {
        type: Sequelize.INTEGER,
        references: { model: 'Games', key: 'id' }
      },
      color: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      position_x: {
        type: Sequelize.INTEGER
      },
      position_y: {
        type: Sequelize.INTEGER
      },
      atk: {
        type: Sequelize.INTEGER
      },
      movement: {
        type: Sequelize.INTEGER
      },
      hidden: {
        type: Sequelize.BOOLEAN
      },
      petrified_turns: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pieces');
  }
};