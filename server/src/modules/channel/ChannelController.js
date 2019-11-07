import ChannelService from './ChannelService';
import Response from '../../responses/response';

class ChannelController {
  static async index(req, res) {
    try {
      const channels = await ChannelService.findAll();
      return Response.ok(res, channels);
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }
}

export default ChannelController;
