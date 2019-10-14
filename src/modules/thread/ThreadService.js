import models from '../../database/models';

const { Thread } = models;

class ThreadService {
  static async findAll() {
    const threads = await Thread.findAll();
    return threads;
  }

  static async findOne(id) {
    const thread = await Thread.findOne({ where: { id } });
    return thread;
  }
}

export default ThreadService;
