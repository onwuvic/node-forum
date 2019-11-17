import FavoriteService from './FavoriteService';
import Response from '../../responses/response';

class FavoriteController {
  static async index(req, res) {
    res.status(200).json('Its works!!! Favorites');
  }

  static async favoriteReply(req, res) {
    try {
      const favoritedReply = await FavoriteService.favoriteReply(req.user.id, req.params.replyId);
      if (!favoritedReply) {
        return Response.badRequest(res, 'Reply id doesn\'t exist');
      }
      return Response.created(res, favoritedReply);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }
}

export default FavoriteController;
