import UserService from '../user/UserService';

class ProfileService {
  static async findByUsername(username) {
    try {
      // find user
      const user = await UserService.findUserByName(username);
      // if user doesn't exist
      if (!user) {
        return { status: false, statusCode: 404, message: 'User doesn\'t exist' };
      }
      return { status: true, resource: user };
    } catch (error) {
      return {
        status: false,
        statusCode: 500,
        message: 'Unable to perform this action at this time. Try again later.'
      };
    }
  }
}

export default ProfileService;
