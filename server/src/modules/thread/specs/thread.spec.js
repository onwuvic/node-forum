import supertest from 'supertest';
import http from 'http';
// import { Sequelize } from 'sequelize';
import app from '../../../app';
import models from '../../../database/models';

describe('', () => {
  let server;
  let request;
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
    beforeEach(async () => {
      await models.Thread.create({ title: 'The walls', body: 'The walls down for all', userId: 1 });
    });

    // afterEach(async () => {
    //   await Object.values(models).map(model => model.destroy({ where: {}, force: true }));
    //   // await Sequelize.queryInterface.query('TRUNCATE TABLE threads CASCADE;');
    // });

    it('should return all threads', async () => {
      // create it own thread
      const response = await request.get(`${baseUrl}/threads`);
      console.log('---->', response.body);

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('title');
    });

    it('should return one thread', async () => {
      // create it own thread
      // use the id of the created thread
      const response = await request.get(`${baseUrl}/threads/1`);
      console.log('---->', response.body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
    });
  });
});
