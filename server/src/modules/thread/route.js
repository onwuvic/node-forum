import express from 'express';
import ThreadController from './ThreadController';
import ReplyController from '../reply/ReplyController';
import Authentication from '../../middleware/authentication';
import ThreadValidator from '../../middleware/validations/threadValidator';

const threadRouter = express.Router();

threadRouter.post(
  '/threads',
  Authentication.tokenAuthentication,
  ThreadValidator.validateCreateThreadDetails,
  ThreadController.create
);
threadRouter.get('/threads', ThreadController.index);
threadRouter.get('/threads/:id', ThreadController.show);
threadRouter.post(
  '/threads/:id/replies',
  Authentication.tokenAuthentication,
  ReplyController.create
);

export default threadRouter;
