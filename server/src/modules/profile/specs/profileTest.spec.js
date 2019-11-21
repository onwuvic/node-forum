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

  describe('Profile Test', () => {
    beforeAll(async () => {
      user = await Mock.createUser();
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      await models.Channel.destroy({ where: {}, force: true });
    });

    describe('User profile', () => {
      it('should return a user profile', async () => {
        // given a user
        // when we hit this endpoint, we should get the user resource
        const response = await request
          .get(`${baseUrl}/profiles/${user.fullName}`);

        expect(response.status).toBe(200);
        expect(response.body.data.fullName).toBe(user.fullName);
      });

      it('should return 404 if a user profile does not exist', async () => {
        // given a user
        // when we hit this endpoint, we should get the user resource
        const response = await request
          .get(`${baseUrl}/profiles/8888`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User doesn\'t exist');
      });
    });
  });
});
