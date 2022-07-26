'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BlogPosts', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        underscore: true
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false, 
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false, 
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('BlogPosts');
  }
};
