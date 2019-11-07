/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    const gender = ['male', 'female'];
    const users = [{
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: bcrypt.hashSync('password', 10),
      gender: 'female',
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    for (let i = 1; i < 10; i++) {
      const seedData = {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password', 10),
        gender: faker.random.arrayElement(gender),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      users.push(seedData);
    }

    return queryInterface.bulkInsert('Users', users);
  },
  down: queryInterface => queryInterface.bulkDelete('Users')
};
