import ChannelService from './ChannelService';
import Response from '../../responses/response';

class ChannelController {
  static async index(req, res) {
    const response = await ChannelService.findAll();
    return Response.httpResponse(res, response);
  }
}

export default ChannelController;
