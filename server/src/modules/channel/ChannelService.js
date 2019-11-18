import models from '../../database/models';

const { Channel } = models;

class ChannelService {
  static async findById(id) {
    const channel = await Channel.findOne({ where: { id } });
    return channel;
  }

  static async findBySlug(slug) {
    const channel = await Channel.findOne({ where: { slug } });
    return channel;
  }

  static async findAll() {
    try {
      const resource = await Channel.findAll();
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

export default ChannelService;
