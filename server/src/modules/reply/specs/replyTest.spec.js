import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import models from '../../../database/models';
import Mock from '../../../tests/utils/testHelper';
import { CREATE_REPLY_ACTIVITY, MODEL_REPLY } from '../../../helpers/constants';

describe('', () => {
  let server;
  let request;
  let thread;
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

  describe('Reply Test', () => {
    beforeAll(async () => {
      user = await Mock.createUser();
      channel = await Mock.createChannel();
      thread = await Mock.createThread(user.id, channel.id);
      token = await Mock.authUser(request, `${baseUrl}/auth/login`, user.email);
    });

    afterAll(async () => {
      await models.User.destroy({ where: {}, force: true });
      await models.Channel.destroy({ where: {}, force: true });
    });

    describe('Delete Reply', () => {
      it('should not be able to delete a reply as a guest', async () => {
        const response = await request
          .delete(`${baseUrl}/replies/9999`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('No token provided');
      });

      it('should not be able to delete a reply if you are not the owner', async () => {
        const userTwo = await Mock.createUser();

        const reply = await Mock.createReply(userTwo.id, thread.id);

        const response = await request
          .delete(`${baseUrl}/replies/${reply.id}`)
          .set('authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('You are not authorized to do this');
      });

      it('should be able to delete a reply and its reply activity if you are the owner',
        async () => {
        // create reply by enpoint to create activity
          const reply = await request
            .post(`${baseUrl}/threads/${thread.id}/replies`)
            .set('authorization', `Bearer ${token}`)
            .send({ body: 'I reply you' });

          const replyId = reply.body.data.id;

          // check if activity was created
          const replyActivity = await Mock
            .findActivity(CREATE_REPLY_ACTIVITY, user.id, replyId, MODEL_REPLY);

          expect(replyActivity.subjectId).toBe(replyId);


          // delete reply
          const response = await request
            .delete(`${baseUrl}/replies/${replyId}`)
            .set('authorization', `Bearer ${token}`);

          // check if reply activity is in the db
          const deletedReplyActivity = await Mock
            .findActivity(CREATE_REPLY_ACTIVITY, user.id, replyId, MODEL_REPLY);

          // check if reply was deleted
          expect(response.status).toBe(200);
          expect(response.body.data).toBe('Deleted Successfully');

          // also confirm that the activity was deleted too
          expect(deletedReplyActivity).toBe(null);
        });

      // it('should delete a reply favorite when a reply is deleted', async () => {
      //   // given a reply
      //   const reply = await Mock.createReply(user.id, thread.id);
      //   // with favorite
      //   await Mock.createFavorite(user.id, reply.id, MODEL_REPLY);

      //   // when the reply is deleted
      //   // delete reply
      //   const response = await request
      //     .delete(`${baseUrl}/replies/${reply.id}`)
      //     .set('authorization', `Bearer ${token}`);

      //   // its favorite should be deleted also
      //   const deletedReplyFavorite = await Mock.findFavorite(user.id, reply.id, MODEL_REPLY);

      //   // check if reply was deleted
      //   expect(response.status).toBe(200);
      //   // also confirm that the activity was deleted too
      //   expect(deletedReplyFavorite).toBe(null);
      // });
    });
  });
});
