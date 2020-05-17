/* eslint-disable import/no-cycle */
import models from '../../database/models';
import ActivityService from '../activity/ActivityService';
import Response from '../../responses/response';
import ThreadService from '../thread/ThreadService';
import { CREATE_REPLY_ACTIVITY, MODEL_REPLY, MODEL_FAVORITE } from '../../helpers/constants';
import FavoriteService from '../favorite/FavoriteService';

const { Reply } = models;

class ReplyService {
  static async create(body, userId, threadId) {
    try {
      const thread = await ThreadService.findOneById(threadId);
      if (!thread) {
        return Response.failureResponseObject(404, 'Thread doesn\'t exist');
      }
      // create reply
      const resource = await Reply.create({ body, userId, threadId });
      // add other resources to the reply object
      resource.setDataValue('user', await resource.getUser());
      resource.setDataValue('favorites', await resource.getFavorites());

      // create reply activity
      await ActivityService.createActivity(resource, CREATE_REPLY_ACTIVITY, userId);
      return Response.successResponseObject(resource, 201);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async findAll() {
    try {
      const resource = await Reply.findAll();
      return Response.successResponseObject(resource);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async deleteRepliesWithAllRelatedActivities(ids) {
    // find all favorites with id and model
    const favorites = await FavoriteService.findAllByFavorableIdAndFavorableType(ids, MODEL_REPLY);

    // delete all the favorite activity associated with this reply
    if (favorites.length) {
      const favoriteIds = favorites.map(favorite => favorite.id);

      await ActivityService.deleteActivity(favoriteIds, MODEL_FAVORITE);
    }

    // delete all the favorite associated with this reply
    await FavoriteService.deleteFavorite(ids, MODEL_REPLY);

    // delete reply activity as well
    await ActivityService.deleteActivity(ids, MODEL_REPLY);
  }

  static async findByIdAndDelete(id) {
    try {
      await ReplyService.deleteRepliesWithAllRelatedActivities(id);

      // delete the thread
      await Reply.destroy({ where: { id } });

      return Response.successResponseObject('Deleted Successfully');
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async findByIdAndUpadte(id, body) {
    try {
      const [numberOfAffectedRows, [resource]] = await Reply.update(
        { body },
        {
          where: { id },
          returning: true
        }
      );
      if (numberOfAffectedRows === 0) {
        return Response.failureResponseObject(404, 'Reply doesn\'t exist');
      }
      return Response.successResponseObject(resource);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async findOneById(id) {
    const reply = await Reply.findOne({ where: { id } });
    return reply;
  }

  static async findAllWithThread(id) {
    const resource = await Reply.findAll({
      where: { threadId: id },
      attributes: ['id']
    });
    return resource;
  }
}

export default ReplyService;
