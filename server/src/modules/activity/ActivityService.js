import models from '../../database/models';

const { Activity } = models;

class ActivityService {
  static async createActivity(model, type, userId) {
    await model.createActivity({ type, userId });
  }

  static async deleteActivity(subjectId, subjectType) {
    await Activity.destroy({ where: { subjectId, subjectType } });
  }

  // WILL Remove this once adding activity children is figured out.
  static async findAllActivityByUserId(userId) {
    const resource = await Activity.scope({ method: ['all', userId] }).findAll();
    return resource;
  }
}

export default ActivityService;
