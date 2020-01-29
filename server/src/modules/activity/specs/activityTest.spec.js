import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';
import {
  CREATE_THREAD_ACTIVITY, CREATE_REPLY_ACTIVITY, CREATE_FAVORITE_ACTIVITY, MODEL_REPLY, MODEL_THREAD
} from '../../../helpers/constants';

describe('', () => {
  let server;
  let request;
  let channel;
  let user;
  let token;
  let thread;
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
      thread = await Mock.createThread(user.id, channel.id);
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
        const activity = await Mock
          .findActivity(CREATE_THREAD_ACTIVITY, user.id, threadId, MODEL_THREAD);

        expect(activity.type).toBe(CREATE_THREAD_ACTIVITY);
        expect(activity.userId).toBe(user.id);
        expect(activity.subjectId).toBe(threadId);
        expect(activity.subjectType).toBe(MODEL_THREAD);
      });
    });

    describe('Reply Event', () => {
      it('should create an activity record when user reply', async () => {
        // when I hit this endpoint to create a thread
        const response = await request
          .post(`${baseUrl}/threads/${thread.id}/replies`)
          .set('authorization', `Bearer ${token}`)
          .send({ body: 'I reply you' });

        const replyId = response.body.data.id;

        // it should record a created reply activity
        const activity = await Mock
          .findActivity(CREATE_REPLY_ACTIVITY, user.id, replyId, MODEL_REPLY);

        expect(activity.type).toBe(CREATE_REPLY_ACTIVITY);
        expect(activity.userId).toBe(user.id);
        expect(activity.subjectId).toBe(replyId);
        expect(activity.subjectType).toBe(MODEL_REPLY);
      });
    });

    describe('Favorite Event', () => {
      it('should create an activity record when user favorite a reply', async () => {
        // given a reply
        const reply = await Mock.createReply(user.id, thread.id);

        // when i hit the endpoint to favorite the reply
        const response = await request
          .post(`${baseUrl}/replies/${reply.id}/favorites`)
          .set('authorization', `Bearer ${token}`);

        const favoriteId = response.body.data.id;

        // it should record a created favorite activity
        const activity = await Mock
          .findActivity(CREATE_FAVORITE_ACTIVITY, user.id, favoriteId, 'favorite');

        expect(activity.type).toBe(CREATE_FAVORITE_ACTIVITY);
        expect(activity.userId).toBe(user.id);
        expect(activity.subjectId).toBe(favoriteId);
        expect(activity.subjectType).toBe('favorite');
      });
    });
  });
});
