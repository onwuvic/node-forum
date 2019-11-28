import models from '../../database/models';
import Response from '../../responses/response';

const { Activity, Thread } = models;

class ActivityService {
  static async createActivity(model, type, userId) {
    await model.createActivity({ type, userId });
  }

  // WILL Remove this once adding activity children is figured out.
  static async findAll() {
    try {
      const resource = await Activity.findAll(
        {
          include: [
            {
              model: Thread,
              as: 'thread',
            },
          ]
        }
      );
      // resource.setDataValue('subject', await resource.getItem());
      return Response.successResponseObject(resource);
    } catch (error) {
      console.log('-------->activity', error);
      return Response.serverErrorResponseObject();
    }
  }
}

export default ActivityService;
