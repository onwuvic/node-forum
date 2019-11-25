import ProfileService from './ProfileService';
import Response from '../../responses/response';

class ProfileController {
  static async show(req, res) {
    const response = await ProfileService.findByUsername(req.params.username);
    if (response.status) {
      return Response.ok(res, response);
    }
    return Response.error(res, response);
  }
}

export default ProfileController;
