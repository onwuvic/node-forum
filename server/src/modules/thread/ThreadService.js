import models from '../../database/models';

const { Thread, Reply, User } = models;

class ThreadService {
  static async findAll() {
    const threads = await Thread.findAll();
    return threads;
  }

  static async findOne(id) {
    const thread = await Thread.findOne({
      where: { id },
      include: [
        {
          model: Reply,
          as: 'replies',
          include: [
            {
              attributes: {
                exclude: 'password'
              },
              model: User,
              as: 'user',
            }
          ]
        },
        {
          model: User,
          as: 'creator',
          attributes: {
            exclude: 'password'
          }
        }
      ]
    });
    return thread;
  }

  static async create(threadData, userId) {
    const thread = await Thread.create({ ...threadData, userId });
    return thread;
  }
}

export default ThreadService;
