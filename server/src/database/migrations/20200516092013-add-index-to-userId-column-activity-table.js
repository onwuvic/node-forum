/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addIndex('Activities', ['userId']),

  down: (queryInterface, Sequelize) => queryInterface.removeIndex('Activities', ['userId'])
};
