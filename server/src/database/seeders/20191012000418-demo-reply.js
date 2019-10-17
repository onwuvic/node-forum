/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

module.exports = {
  up: (queryInterface) => {
    const replies = [];

    for (let i = 0; i < 10; i++) {
      const seedData = {
        userId: faker.random.number({ min: 1, max: 10 }),
        threadId: faker.random.number({ min: 1, max: 10 }),
        body: faker.lorem.sentences(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      replies.push(seedData);
    }

    return queryInterface.bulkInsert('Replies', replies);
  },
  down: queryInterface => queryInterface.bulkDelete('Replies')
};
