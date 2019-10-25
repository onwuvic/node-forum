import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';

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
      user = await Mock.createUser();
      thread = await Mock.createThread(user.id);
      token = await Mock.authUser(request, `${baseUrl}/auth/login`, user.email);
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      // await Object.values(models).map(model => model.destroy({ where: {}, force: true }));
      // await Sequelize.queryInterface.query('TRUNCATE TABLE threads CASCADE;');
    });

    it('should return all threads', async () => {
      const response = await request.get(`${baseUrl}/threads`);

      expect(response.status).toBe(200);
      expect(response.body.data[0]).toHaveProperty('title');
    });

    it('should return one thread', async () => {
      const response = await request.get(`${baseUrl}/threads/${thread.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('title');
    });

    it('should return replies that are associated with a thread', async () => {
      const reply = await Mock.createReply(user.id, thread.id);

      const response = await request.get(`${baseUrl}/threads/${thread.id}`);
      expect(response.body.data.replies[0].body).toBe(reply.body);
    });

    it('should return the creator of the thread', async () => {
      const response = await request.get(`${baseUrl}/threads/${thread.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.creator.id).toBe(user.id);
    });

    // participationInForum Test
    // move this when test heplers are created
    it('should return an anthenticated user reply on a thread', async () => {
      // given we have a authenticated user
      // and an existing thread
      // when the user adds a reply to the thread
      const response = await request
        .post(`${baseUrl}/threads/${thread.id}/replies`)
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
