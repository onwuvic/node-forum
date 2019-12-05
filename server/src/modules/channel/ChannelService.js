import models from '../../database/models';
import Response from '../../responses/response';

const { Channel } = models;

class ChannelService {
  static async findOneById(id) {
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
      return Response.successResponseObject(resource);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }
}

export default ChannelService;
