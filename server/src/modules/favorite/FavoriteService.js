import ReplyService from '../reply/ReplyService';
import models from '../../database/models';
import Response from '../../responses/response';
import { CREATE_FAVORITE } from '../activity/activityConstants';
import ActivityService from '../activity/ActivityService';

const { Favorite } = models;

class FavoriteService {
  static async favoriteReply(userId, replyId) {
    try {
      const reply = await ReplyService.findOneById(replyId);
      if (!reply) {
        return Response.failureResponseObject(400, 'This reply doesn\'t exist');
      }
      if (!await FavoriteService.findUnique(userId, replyId, 'reply')) {
        // const resource = await reply.createFavorite({ userId });
        const resource = await FavoriteService.createFavorite(reply, userId);

        // also create favorite activity
        await ActivityService.createActivity(resource, CREATE_FAVORITE, userId);
        return Response.successResponseObject(resource);
      }
      return Response.failureResponseObject(400, 'Already favorite this reply');
    } catch (error) {
      return Response.serverErrorResponseObject();
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
