/* eslint-disable import/no-cycle */
// import { Sequelize } from 'sequelize';
import models from '../../database/models';
import ChannelService from '../channel/ChannelService';
import UserService from '../user/UserService';
import ActivityService from '../activity/ActivityService';
import Response from '../../responses/response';
import ReplyService from '../reply/ReplyService';
import ThreadFilters from './ThreadFilters';
import { CREATE_THREAD_ACTIVITY, MODEL_THREAD } from '../../helpers/constants';

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
      const channel = await ChannelService.findOneById(data.channelId);
      // if no, throw bad request error
      if (!channel) {
        return Response.failureResponseObject(400, 'Channel doesn\'t exist');
      }
      // create thread and add its channel to the resource
      const resource = await Thread.create({ ...data, userId });
      resource.setDataValue('channel', await resource.getChannel());

      // create activity
      await ActivityService.createActivity(resource, CREATE_THREAD_ACTIVITY, userId);

      return Response.successResponseObject(resource, 201);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async findByIdAndDelete(id) {
    try {
      // delete all thread related activities
      await ThreadService.deleteThreadRelatedActivities(id);
      // delete the thread
      await Thread.destroy({ where: { id } });

      return Response.successResponseObject('Deleted Successfully');
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }

  static async deleteThreadRelatedActivities(id) {
    // get all replies with this thread id
    const replies = await ReplyService.findAllWithThread(id);

    if (replies.length) {
      const ids = replies.map(reply => reply.id);
      // delete replies with all it associated activities feeds including favorite
      await ReplyService.deleteRepliesWithAllRelatedActivities(ids);
    }
    // and also delete it thread activity
    await ActivityService.deleteActivity(id, MODEL_THREAD);
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

  // this will be refactor into a scope
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
      ],
      order: [
        [{ model: Reply, as: 'replies' }, 'createdAt', 'DESC']
      ]
    });
    return thread;
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

  static getPagination(query) {
    const pageValue = query.page ? parseInt(query.page, 10) : 1;
    const sizeValue = query.size ? parseInt(query.size, 10) : 3;
    const page = ((pageValue < 0) || (isNaN(pageValue))) ? 1 : pageValue;
    const size = ((pageValue < 0) || (isNaN(pageValue))) ? 3 : sizeValue;

    const limit = size;
    const offset = page ? page * limit : 0;
    return { limit, offset, page };
  }

  static getPagingData(data, page, limit) {
    const { count: totalItems, rows: threads } = data;
    const currentPage = page;
    const totalPages = Math.ceil(totalItems / limit);
    return {
      totalItems, threads, totalPages, currentPage
    };
  }

  // https://bezkoder.com/node-js-sequelize-pagination-mysql/
}

export default ThreadService;
