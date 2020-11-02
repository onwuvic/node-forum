import FavoriteService from './FavoriteService';
import Response from '../../responses/response';

class FavoriteController {
  static async index(req, res) {
    const response = await FavoriteService.findAll();
    return Response.httpResponse(res, response);
  }

  static async favoriteReply(req, res) {
    const response = await FavoriteService.favoriteReply(req.user.id, req.params.replyId);
    return Response.httpResponse(res, response);
  }

  static async unFavoriteReply(req, res) {
    const response = await FavoriteService.deleteFavoriteById(req.user.id, req.params.replyId);
    return Response.httpResponse(res, response);
  }
}

export default FavoriteController;
