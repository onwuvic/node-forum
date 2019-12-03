import models from '../../database/models';
import ActivityService from '../activity/ActivityService';
import { CREATE_REPLY } from '../activity/activityConstants';
import Response from '../../responses/response';

const { Reply } = models;

class ReplyService {
  static async create(body, userId, threadId) {
    try {
      // create reply
      const resource = await Reply.create({ body, userId, threadId });

      // create reply activity
      await ActivityService.createActivity(resource, CREATE_REPLY, userId);
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
      await ActivityService.deleteActivity(id, 'reply');
      
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
