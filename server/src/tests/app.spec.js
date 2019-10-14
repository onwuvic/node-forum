import supertest from 'supertest';
import http from 'http';
import app from '../app';

describe('Application Test', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('App Root Route', () => {
    it('should return 404', async () => {
      const response = await request.get('/');

      expect(response.status).toBe(404);
    });
  });
});
