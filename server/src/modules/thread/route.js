import express from 'express';
import ThreadController from './ThreadController';
import ReplyController from '../reply/ReplyController';
import Authentication from '../../middleware/authentication';
import ThreadValidator from '../../middleware/validations/threadValidator';
import ReplyValidator from '../../middleware/validations/replyValidator';

const threadRouter = express.Router();

threadRouter.post(
  '/threads',
  Authentication.tokenAuthentication,
  ThreadValidator.validateCreateThreadDetails,
  ThreadController.create
);
threadRouter.get('/threads', ThreadController.index);
threadRouter.get('/threads/:channel', ThreadController.index);
threadRouter.get('/threads/:channel/:id', ThreadController.show);
threadRouter.post(
  '/threads/:id/replies',
  Authentication.tokenAuthentication,
  ReplyValidator.validateCreateReplyDetails,
  ReplyController.create
);

export default threadRouter;
