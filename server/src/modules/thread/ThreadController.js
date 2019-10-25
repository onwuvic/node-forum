import ThreadService from './ThreadService';
import Response from '../../responses/response';

class ThreadController {
  static async index(req, res) {
    try {
      const threads = await ThreadService.findAll();
      return Response.ok(res, threads);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }

  static async show(req, res) {
    try {
      const thread = await ThreadService.findOne(req.params.id);
      return Response.ok(res, thread);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }

  static async store(req, res) {
    try {
      const userId = req.user.id;
      const thread = await ThreadService.create(req.body, userId);
      return Response.created(res, thread);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }
}

export default ThreadController;
