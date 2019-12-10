import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';
import {
  CREATE_THREAD_ACTIVITY, CREATE_REPLY_ACTIVITY, MODEL_REPLY, MODEL_THREAD
} from '../../../helpers/constants';

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

  describe('Thread Creation Test', () => {
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
        expect(response.body.data).toHaveProperty('channel');
        expect(response.body.data.channel.id).toEqual(channel.id);
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

    describe('Validate user input', () => {
      it('should have a title', async () => {
        const response = await request
          .post(`${baseUrl}/threads`)
          .set('authorization', `Bearer ${token}`)
          .send({ body: 'I reply you', channelId: channel.id });

        expect(response.status).toBe(400);
        expect(response.body.message.title).toBe('Please provide title');
      });

      it('should have a body', async () => {
        const response = await request
          .post(`${baseUrl}/threads`)
          .set('authorization', `Bearer ${token}`)
          .send({ title: 'I reply you', channelId: channel.id });

        expect(response.status).toBe(400);
        expect(response.body.message.body).toBe('Please provide body');
      });

      it('should have a valid channel Id', async () => {
        const response = await request
          .post(`${baseUrl}/threads`)
          .set('authorization', `Bearer ${token}`)
          .send({ body: 'I reply you', title: 'I reply you', channelId: 9999 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Channel doesn\'t exist');
      });
    });

    describe('Delete thread', () => {
      it('should not be able to delete thread as a guest user', async () => {
        // given a thread
        const newThread = await Mock.createThread(user.id, channel.id);
        // given i'm not authenticated

        const response = await request
          .delete(`${baseUrl}/threads/${newThread.id}`);

        // when this endpoint i should be forbidden
        expect(response.status).toBe(401);
      });

      it('should be able to delete thread only as the owner', async () => {
        // given a thread
        const newThread = await request
          .post(`${baseUrl}/threads`)
          .set('authorization', `Bearer ${token}`)
          .send({ title: 'the world', body: 'I reply you', channelId: channel.id });

        const threadId = newThread.body.data.id;

        // given we create a reply for this thread
        const newReply = await request
          .post(`${baseUrl}/threads/${threadId}/replies`)
          .set('authorization', `Bearer ${token}`)
          .send({ body: 'I reply you' });

        const replyId = newReply.body.data.id;

        // it activity should be created
        const replyActivity = await Mock
          .findActivity(CREATE_REPLY_ACTIVITY, user.id, replyId, MODEL_REPLY);

        // createdThread activity should be created
        const threadActivity = await Mock
          .findActivity(CREATE_THREAD_ACTIVITY, user.id, threadId, MODEL_THREAD);

        // expect activity to exist
        expect(threadActivity.subjectId).toBe(threadId);
        expect(replyActivity.subjectId).toBe(replyId);

        // when the thread is deleted expect createdThread to be delated too
        // all activity related to this thread should be deleted also e.g reply
        const response = await request
          .delete(`${baseUrl}/threads/${threadId}`)
          .set('authorization', `Bearer ${token}`);

        const deletedThreadActivity = await Mock
          .findActivity(CREATE_THREAD_ACTIVITY, user.id, threadId, MODEL_THREAD);

        const deletedReplyActivity = await Mock
          .findActivity(CREATE_REPLY_ACTIVITY, user.id, replyId, MODEL_REPLY);

        // expect activity not to exist
        expect(deletedThreadActivity).toBe(null);
        expect(deletedReplyActivity).toBe(null);

        // when this endpoint i should be forbidden
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Deleted Successfully');
      });

      it('should return not found if thread does not exist', async () => {
        // given a thread
        await Mock.createThread(user.id, channel.id);

        const response = await request
          .delete(`${baseUrl}/threads/999`)
          .set('authorization', `Bearer ${token}`);

        // when this endpoint i should be forbidden
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Thread doesn\'t exist');
      });

      it('should not be able to delete thread when you are not owner', async () => {
        const newUser = await Mock.createUser();
        // given a thread
        const newThread = await Mock.createThread(newUser.id, channel.id);

        const response = await request
          .delete(`${baseUrl}/threads/${newThread.id}`)
          .set('authorization', `Bearer ${token}`);

        // when this endpoint i should be forbidden
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('You are not authorized to do this');
      });
    });
  });
});
