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

  describe('Thread Test', () => {
    // refactor to a function that just do MockThread.create()
    beforeAll(async () => {
      user = await Mock.createUser();
      channel = await Mock.createChannel();
      thread = await Mock.createThread(user.id, channel.id);
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      await models.Channel.destroy({ where: {}, force: true });
      // await Object.values(models).map(model => model.destroy({ where: {}, force: true }));
      // await Sequelize.queryInterface.query('TRUNCATE TABLE threads CASCADE;');
    });

    it('should return all threads', async () => {
      const response = await request.get(`${baseUrl}/threads`);

      expect(response.status).toBe(200);
      expect(response.body.data[0]).toHaveProperty('title');
      expect(response.body.data[0]).toHaveProperty('channel');
      expect(response.body.data[0]).toHaveProperty('replyCount');
    });

    it('should return one thread', async () => {
      const response = await request.get(`${baseUrl}/threads/${channel.slug}/${thread.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('channel');
      expect(response.body.data).toHaveProperty('creator');
    });

    it('should return replies that are associated with a thread', async () => {
      await Mock.createReply(user.id, thread.id);

      const response = await request.get(`${baseUrl}/threads/${channel.slug}/${thread.id}`);
      // expect(response.body.data.replies[0].body).toBe(reply.body);
      expect(response.body.data.replies[0]).toHaveProperty('user');
    });

    it('should return the creator of the thread', async () => {
      const response = await request.get(`${baseUrl}/threads/${channel.slug}/${thread.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.creator.id).toBe(user.id);
    });

    it('should return all threads in a channel', async () => {
      // given we have a channnel
      // and a thread in that channel
      const response = await request.get(`${baseUrl}/threads/${channel.slug}`);

      expect(response.status).toBe(200);
      expect(response.body.data[0].title).toBe(thread.title);
    });

    it('should not return threads that is not in a channel', async () => {
      // given we have a channnel
      // and a thread in that channel
      const secondChannel = await Mock.createChannel();
      const response = await request.get(`${baseUrl}/threads/${secondChannel.slug}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expect.not.objectContaining(thread));
    });

    it('should return 404 if the thread does not exist', async () => {
      const response = await request.get(`${baseUrl}/threads/${channel.slug}/9999`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Thread doesn\'t exist');
    });

    it('should return 404 if the channel of the thread does not exist', async () => {
      const response = await request.get(`${baseUrl}/threads/yeeeeaso27/${thread.id}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Channel doesn\'t exist');
    });

    it('should return 404 if the channel does not exist', async () => {
      const response = await request.get(`${baseUrl}/threads/yeeeeaso27`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Channel doesn\'t exist');
    });

    it('should filter threads created by owners, by thier name', async () => {
      // given a thread created by a user
      // when the user try to get thread created by them
      // they should see the thread
      const user2 = await Mock.createUser();
      const response = await request.get(`${baseUrl}/threads/?by=${user.fullName}`);

      const response2 = await request.get(`${baseUrl}/threads/?by=${user2.fullName}`);

      expect(response.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(response.body.data[0]).toHaveProperty('replyCount');
      expect(response.body.data[0].title).toEqual(thread.title);
      expect(response2.body.data).toEqual([]);
    });

    it('should filter threads by popularity base on the reply count', async () => {
      // given a thread with 3, 2, 1, 0 replies
      const threadWithThreeReplies = await Mock.createThread(user.id, channel.id);
      await Mock.createReply(user.id, threadWithThreeReplies.id, 3);

      const threadWithTwoReplies = await Mock.createThread(user.id, channel.id);
      await Mock.createReply(user.id, threadWithTwoReplies.id, 2);

      const threadWithOneReplies = await Mock.createThread(user.id, channel.id);
      await Mock.createReply(user.id, threadWithOneReplies.id, 1);

      // thread with no replies
      await Mock.createThread(user.id, channel.id);

      // when we hit the popular endpoint
      const response = await request.get(`${baseUrl}/threads/?popular=1`);
      // it should return the thread by the order of highest reply count

      expect(response.status).toBe(200);
      expect(Mock.arrayColumn(response.body.data, 'replyCount')).toEqual(['3', '2', '1', '1', '0']);
    });

    it('should throw an error if filters is incorrect', async () => {
      const response = await request.get(`${baseUrl}/threads/?populr=1`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Incorrect filter parameters');
    });

    it('should throw an error if user filter name does not exist', async () => {
      const response = await request.get(`${baseUrl}/threads/?by=49ij`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Filter User doesn\'t exist');
    });
  });
});
