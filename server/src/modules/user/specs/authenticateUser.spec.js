import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';

describe('', () => {
  let server;
  let request;
  let user;
  const baseUrl = '/api/v1';

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('User Authentication Test', () => {
    beforeAll(async () => {
      user = await Mock.createUser();
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
    });

    describe('Valid credentials', () => {
      it('should be able to login give right credentials', async () => {
        const response = await request
          .post(`${baseUrl}/auth/login`)
          .send({ email: user.email, password: 'password' });

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('token');
      });
    });

    describe('Invalid Credentials', () => {
      it('should not be able to login give wrong credentials', async () => {
        const response = await request
          .post(`${baseUrl}/auth/login`)
          .send({ email: 'user.email', password: 'passw' });

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Invalid user credentials');
      });
    });
  });
});
