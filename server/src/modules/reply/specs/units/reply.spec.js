// import supertest from 'supertest';
import http from 'http';
import bcrypt from 'bcrypt';
import app from '../../../../app';
import models from '../../../../database/models';

describe.skip('', () => {
  let server;
  let user;
  let thread;
  // let request;
  // let reply;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    // request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Reply Unit Test', () => {
    // refactor to a function that just do MockThread.create()
    // beforeAll(async () => {
    //   reply = await models.Reply.create({ body: 'The walls down for all', userId: 1, threadId: 1 });
    // });
    beforeAll(async () => {
      user = await models.User.create({
        fullName: 'Jane Doe',
        email: 'jane2.doe@example.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'female'
      });
      thread = await models.Thread.create({
        title: 'The walls',
        body: 'The walls down for all',
        userId: user.dataValues.id
      });
    });

    it('should have a user', async () => {
      const { dataValues: reply } = await models.Reply.create(
        { body: 'yes', userId: user.dataValues.id, threadId: thread.dataValues.id }
      );

      expect(reply.userId).toBeInstanceOf(models.User);
    });
  });
});
