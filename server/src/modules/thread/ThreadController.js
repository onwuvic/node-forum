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
          return { status: false, statusCode: 404, message: 'Channel doesn\'t exist' };
        }
        return { status: true, resource };
      }
      // if query is provided
      if (Object.keys(query).length) {
        const response = await ThreadFilters.filter(query);
        if (!response.status) {
          return { status: false, statusCode: 400, message: response.message };
        }
        return { status: true, resource: response.resource };
      }

      // else just get all the thread
      const resource = await ThreadService.findAll();
      return { status: true, resource };
    } catch (error) {
      return {
        status: false,
        statusCode: 500,
        message: 'Unable to perform this action at this time. Try again later.'
      };
    }
  }
}

export default ThreadController;
