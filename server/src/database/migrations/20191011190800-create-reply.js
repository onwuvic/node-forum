/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Replies', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    threadId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Threads',
        key: 'id',
        as: 'thread',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Replies')
};
