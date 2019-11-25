import express from 'express';
import ThreadController from './ThreadController';
import ReplyController from '../reply/ReplyController';
import Authentication from '../../middlewares/authentication';
import ThreadValidator from '../../middlewares/validations/threadValidator';
import ReplyValidator from '../../middlewares/validations/replyValidator';
import Policy from '../../policies/index';

const threadRouter = express.Router();

threadRouter.post(
  '/threads',
  Authentication.tokenAuthentication,
  ThreadValidator.validateCreateThreadDetails,
  ThreadController.create
);
threadRouter.get('/threads', ThreadController.index);
threadRouter.get('/threads/:channel', ThreadController.index);
threadRouter.delete(
  '/threads/:id',
  Authentication.tokenAuthentication,
  Policy.isThreadOwner,
  ThreadController.destroy
);
threadRouter.get('/threads/:channel/:id', ThreadController.show);
threadRouter.post(
  '/threads/:id/replies',
  Authentication.tokenAuthentication,
  ReplyValidator.validateCreateReplyDetails,
  ReplyController.create
);

export default threadRouter;
