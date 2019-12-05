import ReplyService from '../modules/reply/ReplyService';
import Response from '../responses/response';

class ReplyPolicy {
  static async belongToUser(req, res, next) {
    const authId = req.user.id;
    const reply = await ReplyService.findOneById(req.params.id);
    if (!reply) {
      return Response.notFound(res, 'reply doesn\'t exist');
    }
    if (authId !== reply.userId) {
      // move to the next middleware or controller
      return Response.unauthorized(res, 'You are not authorized to do this');
    }
    // throw error
    next();
  }
}

export default ReplyPolicy;
