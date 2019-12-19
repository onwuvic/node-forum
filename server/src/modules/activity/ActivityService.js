import models from '../../database/models';
import Response from '../../responses/response';

const { Activity } = models;

class ActivityService {
  static async createActivity(model, type, userId) {
    await model.createActivity({ type, userId });
  }

  static async deleteActivity(subjectId, subjectType) {
    await Activity.destroy({ where: { subjectId, subjectType } });
  }

  // WILL Remove this once adding activity children is figured out.
  static async findAll() {
    try {
      // const resource = await Activity.findAll(
      //   // {
      //   //   include: [
      //   //     {
      //   //       model: Thread,
      //   //       as: 'thread',
      //   //       // where: { subjectType: 'thread' }
      //   //     },
      //   //   ]
      //   // }
      // );

      const resource = await Activity.findAll();
      // resource.setDataValue('threads', await resource.getThread());

      // resource.setDataValue('subject', await resource.getItem());
      return Response.successResponseObject(resource);
    } catch (error) {
      console.log('-------->activity', error);
      return Response.serverErrorResponseObject();
    }
  }
}

export default ActivityService;
