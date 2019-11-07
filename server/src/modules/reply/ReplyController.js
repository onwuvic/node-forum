import ReplyService from './ReplyService';
import Response from '../../responses/response';

class ReplyController {
  static async index(req, res) {
    res.json('Main reply');
  }

  static async create(req, res) {
    try {
      const userId = req.user.id;
      const reply = await ReplyService.create(req.body.body, userId, req.params.id);
      return Response.created(res, reply);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }
}

export default ReplyController;
