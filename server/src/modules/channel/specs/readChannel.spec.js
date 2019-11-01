import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';

describe('', () => {
  let server;
  let request;
  // let channel;
  const baseUrl = '/api/v1';

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Channel Test', () => {
    beforeAll(async () => {
      await Mock.createChannel();
    });

    afterAll(async () => {
      await models.Channel.destroy({ where: {}, force: true });
    });

    describe('List of channels', () => {
      it('should return all channels', async () => {
        const response = await request
          .get(`${baseUrl}/channels`);

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toHaveProperty('name');
        expect(response.body.data[0]).toHaveProperty('slug');
      });
    });
  });
});
