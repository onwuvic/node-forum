/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Favorites', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'user',
      },
    },
    favorableId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    favorableType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  },
  {
    uniqueKeys: {
      Favorites_unique: {
        fields: ['userId', 'favorableId', 'favorableType']
      }
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Favorites')
};
