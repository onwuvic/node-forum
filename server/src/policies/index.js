import ThreadService from '../modules/thread/ThreadService';
import Response from '../responses/response';


class Policy {
  static async isThreadOwner(req, res, next) {
    const authId = req.user.id;
    const thread = await ThreadService.findOneById(req.params.id);
    if (!thread) {
      return Response.notFound(res, 'Thread doesn\'t exist');
    }
    if (authId !== thread.userId) {
      // move to the next middleware or controller
      return Response.unauthorized(res, 'You are not authorized to do this');
    }
    // throw error
    next();
  }
}

export default Policy;
