/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

module.exports = {
  up: (queryInterface) => {
    const channels = [];

    for (let i = 1; i < 6; i++) {
      const name = faker.lorem.word();

      const seedData = {
        name,
        slug: name,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      channels.push(seedData);
    }

    return queryInterface.bulkInsert('Channels', channels);
  },
  down: queryInterface => queryInterface.bulkDelete('Channels')
};
