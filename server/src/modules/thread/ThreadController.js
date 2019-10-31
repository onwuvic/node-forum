import ThreadService from './ThreadService';
import Response from '../../responses/response';
import ChannelService from '../channel/ChannelService';

class ThreadController {
  static async index(req, res) {
    let threads;
    try {
      if (req.params.channel) {
        threads = await ThreadService.findAllWithChannel(req.params.channel);
        if (!threads) {
          return Response.notFound(res, 'Channel doesn\'t exist');
        }
      } else {
        threads = await ThreadService.findAll();
      }
      return Response.ok(res, threads);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }

  static async show(req, res) {
    try {
      const channel = await ChannelService.findBySlug(req.params.channel);
      if (!channel) {
        return Response.notFound(res, 'Channel doesn\'t exist');
      }
      const thread = await ThreadService.findById(req.params.id, channel.id);
      if (!thread) {
        return Response.notFound(res, 'Thread doesn\'t exist');
      }
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
