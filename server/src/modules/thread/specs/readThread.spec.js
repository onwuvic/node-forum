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
    });

    it('should return one thread', async () => {
      const response = await request.get(`${baseUrl}/threads/${channel.slug}/${thread.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('channel');
      expect(response.body.data).toHaveProperty('creator');
    });

    it('should return replies that are associated with a thread', async () => {
      const reply = await Mock.createReply(user.id, thread.id);

      const response = await request.get(`${baseUrl}/threads/${channel.slug}/${thread.id}`);
      expect(response.body.data.replies[0].body).toBe(reply.body);
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
      expect(response.body.data[0]).toEqual(expect.not.objectContaining(thread));
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
  });
});
