import UserService from '../user/UserService';
import Response from '../../responses/response';

class ProfileService {
  static async findByUsername(username) {
    try {
      // find user
      const user = await UserService.findUserByNameWithActivity(username);
      // if user doesn't exist
      if (!user) {
        return Response.failureResponseObject(404, 'User doesn\'t exist');
      }
      return Response.successResponseObject(user);
    } catch (error) {
      return Response.serverErrorResponseObject();
    }
  }
}

export default ProfileService;
