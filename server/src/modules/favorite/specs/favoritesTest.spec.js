import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';
import { MODEL_REPLY, CREATE_FAVORITE_ACTIVITY, MODEL_FAVORITE } from '../../../helpers/constants';

describe('', () => {
  let server;
  let request;
  let thread;
  let user;
  let token;
  let channel;
  let reply;
  const baseUrl = '/api/v1';

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Thread Participation Test', () => {
    beforeAll(async () => {
      user = await Mock.createUser();
      channel = await Mock.createChannel();
      thread = await Mock.createThread(user.id, channel.id);
      token = await Mock.authUser(request, `${baseUrl}/auth/login`, user.email);
      reply = await Mock.createReply(user.id, thread.id);
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      await models.Channel.destroy({ where: {}, force: true });
    });

    describe('Favorite Test Suits', () => {
      describe('Favorite a reply', () => {
        it('should be able to favorite a reply if authenticated and only once', async () => {
          // when I hit this endpoint
          const response = await request
            .post(`${baseUrl}/replies/${reply.id}/favorites`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(201);
          expect(response.body.data.favorableType).toBe(MODEL_REPLY);
          expect(response.body.data.favorableId).toBe(+`${reply.id}`);

          const response2 = await request
            .post(`${baseUrl}/replies/${reply.id}/favorites`)
            .set('authorization', `Bearer ${token}`);

          // // it should not add another favorite to the count
          expect(response2.status).toBe(400);
          expect(response2.body.message).toBe('Already favorite this reply');
        });

        it('should not be able to favorite a reply if unauthenticated', async () => {
          const response = await request.post(`${baseUrl}/replies/${reply.id}/favorites`);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });
      });
      describe('Unfavorite a reply', () => {
        it('should be able to unfavorite a reply if authenticated', async () => {
          // given a reply
          const replyTwo = await Mock.createReply(user.id, thread.id);

          // given a auth user favorite a post
          const response = await request
            .post(`${baseUrl}/replies/${replyTwo.id}/favorites`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(201);
          expect(response.body.data.favorableType).toBe(MODEL_REPLY);
          expect(response.body.data.favorableId).toBe(+`${replyTwo.id}`);

          // when the unfavorite the reply
          const responseTwo = await request
            .delete(`${baseUrl}/replies/${replyTwo.id}/favorites`)
            .set('authorization', `Bearer ${token}`);

          // find the favorite in db
          const favorite = await Mock.findFavorite(user.id, replyTwo.id, MODEL_REPLY);
          // find the activities
          const favoriteActivity = await Mock
            .findActivity(
              CREATE_FAVORITE_ACTIVITY, user.id, response.body.data.id, MODEL_FAVORITE
            );

          // it should delete the favorite and its activities
          // when I hit this endpoint
          expect(responseTwo.status).toBe(200);
          expect(favorite).toBe(null);
          expect(favoriteActivity).toBe(null);
          // expect(responseTwo.body.message).toBe('Already favorite this reply');
        });

        it('should not be able to unfavorite a reply if unauthenticated', async () => {
          const response = await request.delete(`${baseUrl}/replies/7/favorites`);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });
      });
    });
  });
});
