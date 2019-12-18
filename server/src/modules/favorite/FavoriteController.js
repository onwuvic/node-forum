import FavoriteService from './FavoriteService';
import Response from '../../responses/response';

class FavoriteController {
  static async index(req, res) {
    res.status(200).json('Its works!!! Favorites');
  }

  static async favoriteReply(req, res) {
    const response = await FavoriteService.favoriteReply(req.user.id, req.params.replyId);
    if (response.status) {
      return Response.success(res, response);
    }
    return Response.error(res, response);
  }
}

export default FavoriteController;
