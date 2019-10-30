import ThreadService from './ThreadService';
import Response from '../../responses/response';
import ChannelService from '../channel/ChannelService';

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
      const thread = await ThreadService.findById(req.params.id);
      return Response.ok(res, thread);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }

  static async create(req, res) {
    try {
      const userId = req.user.id;
      const channel = await ChannelService.findById(req.body.channelId);
      if (!channel) {
        return Response.badRequest(res, 'Channel id doesn\'t exist');
      }
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
