import ReplyService from './ReplyService';
import Response from '../../responses/response';

class ReplyController {
  static async index(req, res) {
    const response = await ReplyService.findAll();
    return Response.httpResponse(res, response);
  }

  static async create(req, res) {
    const response = await ReplyService.create(req.body.body, req.user.id, req.params.id);
    return Response.httpResponse(res, response);
  }

  static async update(req, res) {
    const response = await ReplyService.findByIdAndUpadte(req.params.id, req.body.body);
    return Response.httpResponse(res, response);
  }

  static async destroy(req, res) {
    const response = await ReplyService.findByIdAndDelete(req.params.id);
    return Response.httpResponse(res, response);
  }
}

export default ReplyController;
