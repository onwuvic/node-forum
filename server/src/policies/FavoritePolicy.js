import FavoriteService from '../modules/favorite/FavoriteService';
import Response from '../responses/response';

class FavoritePolicy {
  static async belongToUser(req, res, next) {
    const authId = req.user.id;
    const favorite = await FavoriteService.findOneById(req.params.favoriteId);
    if (!favorite) {
      return Response.notFound(res, 'favorite doesn\'t exist');
    }
    if (authId !== favorite.userId) {
      // move to the next middleware or controller
      return Response.unauthorized(res, 'You are not authorized to do this');
    }
    // throw error
    next();
  }
}

export default FavoritePolicy;
