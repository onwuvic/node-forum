import ReplyService from './ReplyService';
import Response from '../../responses/response';

class ReplyController {
  static async index(req, res) {
    const response = await ReplyService.findAll();
    if (response.status) {
      return Response.ok(res, response);
    }
    return Response.error(res, response);
  }

  static async create(req, res) {
    const response = await ReplyService.create(req.body.body, req.user.id, req.params.id);
    if (response.status) {
      return Response.created(res, response);
    }
    return Response.error(res, response);
  }
}

export default ReplyController;
