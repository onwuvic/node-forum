import ProfileService from './ProfileService';
import Response from '../../responses/response';
import ActivityService from '../activity/ActivityService';

class ProfileController {
  static async show(req, res) {
    const response = await ProfileService.findByUsername(req.params.username);
    return Response.httpResponse(res, response);
  }

  // WILL Remove this once adding activity children is figured out.
  static async findAll(req, res) {
    const response = await ActivityService.findAll();
    return Response.httpResponse(res, response);
  }
}

export default ProfileController;
