import models from '../../database/models';

const { Reply } = models;

class ReplyService {
  static async create(body, userId, threadId) {
    try {
      const resource = await Reply.create({ body, userId, threadId });
      return { status: true, resource };
    } catch (error) {
      return {
        status: false,
        statusCode: 500,
        message: 'Unable to perform this action at this time. Try again later.'
      };
    }
  }

  static async findAll() {
    try {
      const resource = await Reply.findAll();
      return { status: true, resource };
    } catch (error) {
      return {
        status: false,
        statusCode: 500,
        message: 'Unable to perform this action at this time. Try again later.'
      };
    }
  }

  static async findById(id) {
    const reply = await Reply.findOne({ where: { id } });
    return reply;
  }
}

export default ReplyService;
