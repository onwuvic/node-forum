// import { Sequelize } from 'sequelize';
import models from '../../database/models';
import ChannelService from '../channel/ChannelService';
import UserService from '../user/UserService';
import ActivityService from '../activity/ActivityService';
import { CREATE_THREAD } from '../activity/activityConstants';
import Response from '../../responses/response';

const {
  Thread, Reply, User, Channel, Favorite
} = models;

class ThreadService {
  static async findByIdAndChannel(id, channelSlug) {
    try {
      // check if channel exist
      const channel = await ChannelService.findBySlug(channelSlug);
      // if no, throw not found error
      if (!channel) {
        return Response.failureResponseObject(404, 'Channel doesn\'t exist');
      }
      // check if the thread and channel exist on thread table
      const resource = await ThreadService.findOneByIdAndChannel(id, channel.id);
      // if no, throw not found error
      if (!resource) {
        return Response.failureResponseObject(404, 'Thread doesn\'t exist');
      }

      return Response.successResponseObject(resource);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async create(data, userId) {
    try {
      // check if channel exist
      const channel = await ChannelService.findById(data.channelId);
      // if no, throw bad request error
      if (!channel) {
        return Response.failureResponseObject(400, 'Channel doesn\'t exist');
      }
      // create thread and add its channel to the resource
      const resource = await Thread.create({ ...data, userId });
      resource.setDataValue('channel', await resource.getChannel());

      // create activity
      await ActivityService.createActivity(resource, CREATE_THREAD, userId);

      return Response.successResponseObject(resource);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async findByIdAndDelete(id) {
    try {
      await Thread.destroy({ where: { id } });
      return Response.successResponseObject('Deleted Successfully');
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

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

  static async findOneById(id) {
    const thread = await Thread.findOne({
      where: { id }
    });

    return thread;
  }

  static async findOneByIdAndChannel(id, channelId) {
    const thread = await Thread.findOne({
      where: { id, channelId },
      include: [
        {
          model: Reply,
          as: 'replies',
          include: [
            {
              model: User,
              as: 'user',
            },
            {
              model: Favorite,
              as: 'favorites',
            },
          ],
        },
        {
          model: User,
          as: 'creator'
        },
        {
          model: Channel,
          as: 'channel'
        }
      ]
    });
    return thread;
  }
}

export default ThreadService;
