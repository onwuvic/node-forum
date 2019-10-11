/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');

module.exports = {
  up: (queryInterface) => {
    const replies = [];

    for (let i = 0; i < 10; i++) {
      const seedData = {
        userId: i + 1,
        threadId: faker.random.number(10),
        body: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      replies.push(seedData);
    }

    return queryInterface.bulkInsert('Replies', replies);
  },
  down: queryInterface => queryInterface.bulkDelete('Replies')
};
