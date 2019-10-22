import models from '../../database/models';

const { User } = models;
class UserService {
  static async findUserByEmail(email) {
    const user = await User.findOne({
      where: { email }
    });
    return user;
  }
}

export default UserService;
