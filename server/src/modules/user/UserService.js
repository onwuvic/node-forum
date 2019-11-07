import models from '../../database/models';

const { User } = models;
class UserService {
  static async findUserByEmail(email) {
    const user = await User.findOne({
      where: { email }
    });
    return UserService.refineObject(user);
  }

  static async findUserByName(fullName) {
    const user = await User.findOne({
      where: { fullName }
    });
    return UserService.refineObject(user);
  }

  static refineObject(user) {
    if (!user) {
      return null;
    }
    const { dataValues: userObj } = user;
    return userObj;
  }
}

export default UserService;
