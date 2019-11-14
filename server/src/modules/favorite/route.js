import express from 'express';
import FavoriteController from './FavoriteController';

const favoriteRouter = express.Router();

favoriteRouter.get('/favorites', FavoriteController.index);

export default favoriteRouter;
