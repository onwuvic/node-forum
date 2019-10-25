// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import bcrypt from 'bcrypt';
import models from '../../database/models';

class Mock {
  static async createUser() {
    const gender = ['male', 'female'];
    const newUser = await models.User.create({
      fullName: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('password', 10),
      gender: faker.random.arrayElement(gender),
    });
    const { dataValues: user } = newUser;
    return user;
  }

  static async authUser(request, url, email) {
    const { body: { data: { token: authToken } } } = await request
      .post(url)
      .send({ email, password: 'password' });
    return authToken;
  }

  static async createThread(userId) {
    const newThread = await models.Thread.create({
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs(),
      userId
    });
    const { dataValues: thread } = newThread;
    return thread;
  }

  static async createReply(userId, threadId) {
    const newReply = await models.Reply.create({
      body: faker.lorem.sentences(),
      userId,
      threadId
    });
    const { dataValues: reply } = newReply;
    return reply;
  }
}

export default Mock;
