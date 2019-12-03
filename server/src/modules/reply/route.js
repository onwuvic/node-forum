import express from 'express';
import ReplyController from './ReplyController';
import FavoriteController from '../favorite/FavoriteController';
import Authentication from '../../middlewares/authentication';
import ReplyPolicy from '../../policies/ReplyPolicy';


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

export default replyRouter;
