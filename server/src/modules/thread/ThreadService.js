// import { Sequelize } from 'sequelize';
import models from '../../database/models';
import ChannelService from '../channel/ChannelService';
import UserService from '../user/UserService';

const {
  Thread, Reply, User, Channel
} = models;

class ThreadService {
  static async findAll() {
    const threads = await Thread.scope('all').findAll();

    return threads;
  }

  static async findAllByChannel(channelSlug) {
    const channel = await ChannelService.findBySlug(channelSlug);
    if (!channel) {
      return null;
    }
    const threads = await Thread
      .scope('all', { method: ['byChannel', channel.id] })
      .findAll();

    return threads;
  }

  static async findAllByUser(name) {
    const user = await UserService.findUserByName(name);
    if (!user) {
      return null;
    }
    const threads = await Thread
      .scope('all', { method: ['byUser', user.id] })
      .findAll();

    return threads;
  }

  static async findAllByPopular() {
    const threads = await Thread
      .scope('byPopular')
      .findAll();

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
}

export default ThreadService;
