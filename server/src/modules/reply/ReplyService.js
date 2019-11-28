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

  static async findById(id) {
    const reply = await Reply.findOne({ where: { id } });
    return reply;
  }
}

export default ReplyService;
