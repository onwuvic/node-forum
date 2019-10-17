import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';

describe('', () => {
  let server;
  let request;
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

  describe('Thread Test', () => {
    // refactor to a function that just do MockThread.create()
    beforeAll(async () => {
      thread = await models.Thread.create({ title: 'The walls', body: 'The walls down for all', userId: 1 });
    });

    // afterEach(async () => {
    //   await Object.values(models).map(model => model.destroy({ where: {}, force: true }));
    //   // await Sequelize.queryInterface.query('TRUNCATE TABLE threads CASCADE;');
    // });

    it('should return all threads', async () => {
      const response = await request.get(`${baseUrl}/threads`);

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('title');
    });

    it('should return one thread', async () => {
      const response = await request.get(`${baseUrl}/threads/${thread.dataValues.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
    });

    it('should return replies that are associated with a thread', async () => {
      // and the thread includes replies
      const { dataValues: reply } = await models.Reply.create({ body: 'yes', userId: 1, threadId: thread.dataValues.id });

      // the thread should return the replies
      const response = await request.get(`${baseUrl}/threads/${thread.dataValues.id}`);
      expect(response.body.replies[0].body).toBe(reply.body);
    });
  });
});
