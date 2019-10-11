/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
const faker = require('faker');

module.exports = {
  up: (queryInterface) => {
    const threads = [];

    for (let i = 1; i < 10; i++) {
      const seedData = {
        userId: i,
        title: faker.lorem.words(),
        body: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      threads.push(seedData);
    }

    return queryInterface.bulkInsert('Threads', threads);
  },
  down: queryInterface => queryInterface.bulkDelete('Threads')
};
