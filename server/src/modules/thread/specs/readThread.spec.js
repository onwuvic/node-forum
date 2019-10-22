import supertest from 'supertest';
import http from 'http';
import bcrypt from 'bcrypt';
import app from '../../../app';
import models from '../../../database/models';

describe('', () => {
  let server;
  let request;
  let thread;
  let user;
  let token;
  const baseUrl = '/api/v1';

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Thread Test', () => {
    // refactor to a function that just do MockThread.create()
    beforeAll(async () => {
      user = await models.User.create({
        fullName: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'female'
      });
      thread = await models.Thread.create({
        title: 'The walls',
        body: 'The walls down for all',
        userId: user.dataValues.id
      });
      const { body: { data: { token: authToken } } } = await request
        .post(`${baseUrl}/auth/login`)
        .send({
          email: user.dataValues.email, password: 'password'
        });
      token = authToken;
    });

    // afterEach(async () => {
    //   await Object.values(models).map(model => model.destroy({ where: {}, force: true }));
    //   // await Sequelize.queryInterface.query('TRUNCATE TABLE threads CASCADE;');
    // });

    it('should return all threads', async () => {
      const response = await request.get(`${baseUrl}/threads`);

      expect(response.status).toBe(200);
      expect(response.body.data[0]).toHaveProperty('title');
    });

    it('should return one thread', async () => {
      const response = await request.get(`${baseUrl}/threads/${thread.dataValues.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('title');
    });

    it('should return replies that are associated with a thread', async () => {
      // and the thread includes replies
      const { dataValues: reply } = await models.Reply.create(
        { body: 'yes', userId: user.dataValues.id, threadId: thread.dataValues.id }
      );

      // the thread should return the replies
      const response = await request.get(`${baseUrl}/threads/${thread.dataValues.id}`);
      expect(response.body.data.replies[0].body).toBe(reply.body);
    });

    it('should return the creator of the thread', async () => {
      // given we have a thread
      // when we try to get the thread
      const response = await request.get(`${baseUrl}/threads/${thread.dataValues.id}`);

      // it should return who created the thread
      expect(response.status).toBe(200);
      expect(response.body.data.creator.id).toBe(user.id);
    });

    // participationInForum Test
    it('should return an anthenticated user reply on a thread', async () => {
      // given we have a authenticated user
      // and an existing thread
      // when the user adds a reply to the thread
      const response = await request
        .post(`${baseUrl}/threads/${thread.dataValues.id}/replies`)
        .set('authorization', `Bearer ${token}`)
        .send({ body: 'I reply you' });

      // then their reply should be return to the client
      expect(response.status).toBe(201);
      expect(response.body.data.body).toBe('I reply you');

      //
      // const threadResponse = await request.get(`${baseUrl}/threads/${thread.dataValues.id}`);
      // expect(response.body.replies[0].body).toBe(reply.body);
    });
  });
});
