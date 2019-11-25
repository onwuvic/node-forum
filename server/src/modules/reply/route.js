import express from 'express';
import ReplyController from './ReplyController';
import FavoriteController from '../favorite/FavoriteController';
import Authentication from '../../middlewares/authentication';


const replyRouter = express.Router();

replyRouter.get('/replies', ReplyController.index);
replyRouter.post(
  '/replies/:replyId/favorites',
  Authentication.tokenAuthentication,
  FavoriteController.favoriteReply
);

export default replyRouter;
