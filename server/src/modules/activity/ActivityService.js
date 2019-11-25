class ActivityService {
  static async createActivity(model, type, userId) {
    await model.createActivity({ type, userId });
  }
}

export default ActivityService;
