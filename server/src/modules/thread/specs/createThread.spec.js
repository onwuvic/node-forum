import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';

describe('', () => {
  let server;
  let request;
  let user;
  let token;
  let channel;
  const baseUrl = '/api/v1';

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Thread Participation Test', () => {
    beforeAll(async () => {
      user = await Mock.createUser();
      channel = await Mock.createChannel();
      token = await Mock.authUser(request, `${baseUrl}/auth/login`, user.email);
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      await models.Channel.destroy({ where: {}, force: true });
    });

    describe('Authenticated user can create thread', () => {
      it('should be able to create a thread', async () => {
        const response = await request
          .post(`${baseUrl}/threads`)
          .set('authorization', `Bearer ${token}`)
          .send({ title: 'the world', body: 'I reply you', channelId: channel.id });

        expect(response.status).toBe(201);
        expect(response.body.data.body).toBe('I reply you');
      });
    });

    describe('Unauthenticated user can not create thread', () => {
      it('should not be able to create a thread', async () => {
        const response = await request
          .post(`${baseUrl}/threads`)
          .send({ title: 'the world', body: 'I reply you', channelId: channel.id });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('No token provided');
      });
    });
  });
});
