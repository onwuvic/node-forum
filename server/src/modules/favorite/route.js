import express from 'express';
import FavoriteController from './FavoriteController';
import Authentication from '../../middlewares/authentication';
import FavoritePolicy from '../../policies/FavoritePolicy';

const favoriteRouter = express.Router();

favoriteRouter.get('/favorites', FavoriteController.index);

favoriteRouter.post(
  '/replies/:replyId/favorites',
  Authentication.tokenAuthentication,
  FavoriteController.favoriteReply
);

favoriteRouter.delete(
  '/replies/:favoriteId/favorites',
  Authentication.tokenAuthentication,
  FavoritePolicy.belongToUser,
  FavoriteController.unFavoriteReply
);

export default favoriteRouter;
