import ChannelService from './ChannelService';
import Response from '../../responses/response';

class ChannelController {
  static async index(req, res) {
    const response = await ChannelService.findAll();
    if (response.status) {
      return Response.ok(res, response);
    }
    return Response.error(res, response);
  }
}

export default ChannelController;
