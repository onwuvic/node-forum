import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';

describe('', () => {
  let server;
  let request;
  let channel;
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

  describe('Activity Test', () => {
    beforeAll(async () => {
      user = await Mock.createUser();
      channel = await Mock.createChannel();
      token = await Mock.authUser(request, `${baseUrl}/auth/login`, user.email);
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      await models.Channel.destroy({ where: {}, force: true });
      await models.Activity.destroy({ where: {}, force: true });
    });

    describe('Thread Events', () => {
      it('should create an activity record when user create a thread', async () => {
        // when I hit this endpoint to create a thread
        const response = await request
          .post(`${baseUrl}/threads`)
          .set('authorization', `Bearer ${token}`)
          .send({ title: 'the world', body: 'I reply you', channelId: channel.id });

        const threadId = response.body.data.id;

        // it should record a createthread activity
        const activity = await Mock.findActivity('createThread', user.id, threadId, 'thread');

        console.log('---->', activity);

        expect(Object.keys(activity).length).toEqual(1);
      });
    });
  });
});
