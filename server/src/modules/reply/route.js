import express from 'express';
import ReplyController from './ReplyController';
import FavoriteController from '../favorite/FavoriteController';
import Authentication from '../../middlewares/authentication';
import ReplyPolicy from '../../policies/ReplyPolicy';
import ReplyValidator from '../../middlewares/validations/replyValidator';


const replyRouter = express.Router();

replyRouter.get(
  '/replies',
  ReplyController.index
);

replyRouter.delete(
  '/replies/:id',
  Authentication.tokenAuthentication,
  ReplyPolicy.belongToUser,
  ReplyController.destroy
);

replyRouter.post(
  '/replies/:replyId/favorites',
  Authentication.tokenAuthentication,
  FavoriteController.favoriteReply
);

replyRouter.put(
  '/replies/:id',
  Authentication.tokenAuthentication,
  ReplyPolicy.belongToUser,
  ReplyValidator.validateCreateReplyDetails,
  ReplyController.update
);

export default replyRouter;
