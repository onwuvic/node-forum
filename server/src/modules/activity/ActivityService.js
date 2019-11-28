import models from '../../database/models';

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
      return { status: true, resource };
    } catch (error) {
      console.log('-------->activity', error);
      return {
        status: false,
        statusCode: 500,
        message: 'Unable to perform this action at this time. Try again later.'
      };
    }
  }
}

export default ActivityService;
