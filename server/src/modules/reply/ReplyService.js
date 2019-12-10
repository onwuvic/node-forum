import models from '../../database/models';
import ActivityService from '../activity/ActivityService';
import Response from '../../responses/response';
// eslint-disable-next-line import/no-cycle
import ThreadService from '../thread/ThreadService';
import { CREATE_REPLY_ACTIVITY, MODEL_REPLY } from '../../helpers/constants';

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
      return Response.successResponseObject(resource);
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

  static async findByIdAndDelete(id) {
    try {
      // delete reply activity as well
      await ActivityService.deleteActivity(id, MODEL_REPLY);

      // delete the thread
      await Reply.destroy({ where: { id } });

      return Response.successResponseObject('Deleted Successfully');
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
