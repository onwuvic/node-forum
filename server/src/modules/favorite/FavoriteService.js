import ReplyService from '../reply/ReplyService';
import models from '../../database/models';

const { Favorite } = models;

class FavoriteService {
  static async favoriteReply(userId, replyId) {
    try {
      const reply = await ReplyService.findById(replyId);
      if (!reply) {
        return { status: false, statusCode: 400, message: 'This reply doesn\'t exist' };
      }
      if (!await FavoriteService.findUnique(userId, replyId, 'reply')) {
        // const resource = await reply.createFavorite({ userId });
        const resource = await FavoriteService.createFavorite(reply, userId);
        return { status: true, resource };
      }
      return { status: false, statusCode: 400, message: 'Already favorite this reply' };
    } catch (error) {
      return {
        status: false,
        statusCode: 500,
        message: 'Unable to perform this action at this time. Try again later.'
      };
    }
  }

  static async findUnique(userId, favorableId, favorableType) {
    const favorite = await Favorite.findOne({ where: { userId, favorableId, favorableType } });
    return favorite;
  }

  static async createFavorite(model, userId) {
    const favorite = await model.createFavorite({ userId });
    return favorite;
  }
}

export default FavoriteService;
