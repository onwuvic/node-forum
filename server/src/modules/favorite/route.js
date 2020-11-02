import express from 'express';
import FavoriteController from './FavoriteController';
import Authentication from '../../middlewares/authentication';

const favoriteRouter = express.Router();

favoriteRouter.get('/favorites', FavoriteController.index);

favoriteRouter.post(
  '/replies/:replyId/favorites',
  Authentication.tokenAuthentication,
  FavoriteController.favoriteReply
);

favoriteRouter.delete(
  '/replies/:replyId/favorites',
  Authentication.tokenAuthentication,
  FavoriteController.unFavoriteReply
);

export default favoriteRouter;
