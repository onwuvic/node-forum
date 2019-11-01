import models from '../../database/models';
import ChannelService from '../channel/ChannelService';

const {
  Thread, Reply, User, Channel
} = models;

class ThreadService {
  static async findAll() {
    const threads = await Thread.findAll({
      include: [
        {
          model: Channel,
          as: 'channel'
        }
      ]
    });
    return threads;
  }

  static async findById(id, channelId) {
    const thread = await Thread.findOne({
      where: { id, channelId },
      include: [
        {
          model: Reply,
          as: 'replies',
          include: [
            {
              attributes: {
                exclude: 'password'
              },
              model: User,
              as: 'user',
            }
          ]
        },
        {
          model: User,
          as: 'creator',
          attributes: {
            exclude: 'password'
          }
        },
        {
          model: Channel,
          as: 'channel'
        }
      ]
    });
    return thread;
  }

  static async create(threadData, userId) {
    const thread = await Thread.create({ ...threadData, userId });
    thread.setDataValue('channel', await thread.getChannel());
    return thread;
  }

  static async findAllWithChannel(channelSlug) {
    const channel = await ChannelService.findBySlug(channelSlug);
    if (!channel) {
      return null;
    }
    const threads = await Thread.findAll({
      where: { channelId: channel.id },
      include: [
        {
          model: Channel,
          as: 'channel'
        }
      ]
    });
    return threads;
  }
}

export default ThreadService;
