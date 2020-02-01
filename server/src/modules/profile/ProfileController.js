import ProfileService from './ProfileService';
import Response from '../../responses/response';

class ProfileController {
  static async show(req, res) {
    const response = await ProfileService.findByUsername(req.params.username);
    return Response.httpResponse(res, response);
  }
}

export default ProfileController;
