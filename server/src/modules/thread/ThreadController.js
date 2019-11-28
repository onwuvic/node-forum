import ThreadService from './ThreadService';
import Response from '../../responses/response';
import ThreadFilters from './ThreadFilters';

class ThreadController {
  static async index(req, res) {
    const response = await ThreadController.getThreads(req);
    if (response.status) {
      return Response.ok(res, response);
    }
    return Response.error(res, response);
  }

  static async show(req, res) {
    const response = await ThreadService.findByIdAndChannel(req.params.id, req.params.channel);
    if (response.status) {
      return Response.ok(res, response);
    }
    return Response.error(res, response);
  }

  static async create(req, res) {
    const response = await ThreadService.create(req.body, req.user.id);
    if (response.status) {
      return Response.created(res, response);
    }
    return Response.error(res, response);
  }

  static async destroy(req, res) {
    const response = await ThreadService.findByIdAndDelete(req.params.id);
    if (response.status) {
      return Response.ok(res, response);
    }
    return Response.error(res, response);
  }

  static async getThreads(request) {
    try {
      const channelSlug = request.params.channel;
      const { query } = request;
      // if channel is provided
      if (channelSlug) {
        const resource = await ThreadService.findAllByChannel(channelSlug);
        if (!resource) {
          return Response.failureResponseObject(404, 'Channel doesn\'t exist');
        }
        return Response.successResponseObject(resource);
      }
      // if query is provided
      if (Object.keys(query).length) {
        const response = await ThreadFilters.filter(query);
        if (!response.status) {
          return Response.failureResponseObject(400, response.message);
        }
        return Response.successResponseObject(response.resource);
      }

      // else just get all the thread
      const resource = await ThreadService.findAll();
      return Response.successResponseObject(resource);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }
}

export default ThreadController;
