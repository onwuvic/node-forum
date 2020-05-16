/* eslint-disable import/no-cycle */
import ReplyService from '../reply/ReplyService';
import models from '../../database/models';
import Response from '../../responses/response';
import ActivityService from '../activity/ActivityService';
import { CREATE_FAVORITE_ACTIVITY, MODEL_REPLY } from '../../helpers/constants';

const { Favorite, Reply } = models;

class FavoriteService {
  static async favoriteReply(userId, replyId) {
    try {
      const reply = await ReplyService.findOneById(replyId);
      if (!reply) {
        return Response.failureResponseObject(400, 'This reply doesn\'t exist');
      }
      if (!await FavoriteService.findUnique(userId, replyId, MODEL_REPLY)) {
        // const resource = await reply.createFavorite({ userId });
        const resource = await FavoriteService.createFavorite(reply, userId);

        // also create favorite activity
        await ActivityService.createActivity(resource, CREATE_FAVORITE_ACTIVITY, userId);
        return Response.successResponseObject(resource, 201);
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

  static async deleteFavorite(favorableId, favorableType) {
    await Favorite.destroy({ where: { favorableId, favorableType } });
  }

  static async findAllByFavorableIdAndFavorableType(favorableId, favorableType) {
    const favorites = await Favorite.findAll({
      where: { favorableId, favorableType },
      attributes: ['id']
    });
    return favorites;
  }

  static async findAll() {
    try {
      const resource = await Favorite.findAll({
        include: [
          {
            model: Reply,
            as: 'reply',
          }
        ]
      });

      return Response.successResponseObject(resource);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }
}

export default FavoriteService;
