import ThreadService from './ThreadService';
import Response from '../../responses/response';

class ThreadController {
  static async index(req, res) {
    const response = await ThreadService.getThreads(req);
    if (response.status) {
      return Response.success(res, response);
    }
    return Response.error(res, response);
  }

  static async show(req, res) {
    const response = await ThreadService.findByIdAndChannel(req.params.id, req.params.channel);
    if (response.status) {
      return Response.success(res, response);
    }
    return Response.error(res, response);
  }

  static async create(req, res) {
    const response = await ThreadService.create(req.body, req.user.id);
    if (response.status) {
      return Response.success(res, response);
    }
    return Response.error(res, response);
  }

  static async destroy(req, res) {
    const response = await ThreadService.findByIdAndDelete(req.params.id);
    if (response.status) {
      return Response.success(res, response);
    }
    return Response.error(res, response);
  }
}

export default ThreadController;
