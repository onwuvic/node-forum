import models from '../../database/models';

const { Reply } = models;

class ReplyService {
  static async create(body, userId, threadId) {
    const reply = await Reply.create({ body, userId, threadId });
    return reply;
  }
}

export default ReplyService;
