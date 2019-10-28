import express from 'express';
import ThreadController from './ThreadController';
import ReplyController from '../reply/ReplyController';
import Authentication from '../../middleware/authentication';

const threadRouter = express.Router();

threadRouter.post(
  '/threads',
  Authentication.tokenAuthentication,
  ThreadController.create
);
threadRouter.get('/threads', ThreadController.index);
threadRouter.get('/threads/:id', ThreadController.show);
threadRouter.post(
  '/threads/:id/replies',
  Authentication.tokenAuthentication,
  ReplyController.store
);

export default threadRouter;
