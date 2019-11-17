import ReplyService from '../reply/ReplyService';
import models from '../../database/models';

const { Favorite } = models;

class FavoriteService {
  static async favoriteReply(userId, replyId) {
    const reply = await ReplyService.findById(replyId);
    if (!reply) {
      return null;
    }
    if (!await FavoriteService.findUnique(userId, replyId, 'reply')) {
      const favoritedReply = await reply.createFavorite({ userId });
      return favoritedReply;
    }
  }

  static async findUnique(userId, favorableId, favorableType) {
    const favorite = await Favorite.findOne({ where: { userId, favorableId, favorableType } });
    return favorite;
  }
}

export default FavoriteService;
