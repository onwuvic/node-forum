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
      thread = await Mock.createThread(user.id, channel.id);
      token = await Mock.authUser(request, `${baseUrl}/auth/login`, user.email);
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      await models.Channel.destroy({ where: {}, force: true });
    });

    describe('Authenticated user can participate', () => {
      it('should be able to reply a thread', async () => {
        const response = await request
          .post(`${baseUrl}/threads/${thread.id}/replies`)
          .set('authorization', `Bearer ${token}`)
          .send({ body: 'I reply you' });

        expect(response.status).toBe(201);
        expect(response.body.data.body).toBe('I reply you');
        expect(response.body.data).toHaveProperty('body');
        expect(response.body.data).toHaveProperty('user');
        expect(response.body.data).toHaveProperty('favorites');

        const threadResponse = await request.get(`${baseUrl}/threads/${channel.slug}/${thread.id}`);

        expect(threadResponse.status).toBe(200);
        expect(threadResponse.body.data.replies[0].body).toBe('I reply you');
      });

      it('should not be able to add a reply to non existing thread', async () => {
        const response = await request
          .post(`${baseUrl}/threads/9999/replies`)
          .set('authorization', `Bearer ${token}`)
          .send({ body: 'I reply you' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Thread doesn\'t exist');
      });
    });

    describe('Unauthenticated user can not participate', () => {
      it('should not be able to reply a thread', async () => {
        const response = await request
          .post(`${baseUrl}/threads/1/replies`)
          .send({ body: 'I reply you' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('No token provided');
      });
    });

    describe('Validate reply input', () => {
      it('should have a body', async () => {
        const response = await request
          .post(`${baseUrl}/threads/1/replies`)
          .set('authorization', `Bearer ${token}`)
          .send({ });

        expect(response.status).toBe(400);
        expect(response.body.message.body).toBe('Please provide body');
      });
    });
  });
});
