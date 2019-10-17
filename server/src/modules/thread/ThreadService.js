import models from '../../database/models';

const { Thread, Reply } = models;

class ThreadService {
  static async findAll() {
    const threads = await Thread.findAll();
    return threads;
  }

  static async findOne(id) {
    const thread = await Thread.findOne({
      where: { id },
      include: [{
        model: Reply,
        as: 'replies'
      }]
    });
    return thread;
  }
}

export default ThreadService;
