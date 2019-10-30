import models from '../../database/models';

const { Channel } = models;

class ChannelService {
  static async findById(id) {
    const channel = await Channel.findOne({ where: { id } });
    return channel;
  }
}

export default ChannelService;
