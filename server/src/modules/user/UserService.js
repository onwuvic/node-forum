import models from '../../database/models';
import Utils from '../../helpers/Utils';
import Token from '../../helpers/Token';

const { User, Thread } = models;
class UserService {
  static async findUserByEmail(email) {
    const user = await User.scope('withPassword').findOne({
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

  static async findUserByNameWithThreads(fullName) {
    const resource = await User.findOne({
      where: { fullName },
      include: [
        {
          model: Thread,
          as: 'threads'
        },
      ]
    });

    return resource;
  }

  static refineObject(user) {
    if (!user) {
      return null;
    }
    const { dataValues: userObj } = user;
    return userObj;
  }

  static async login(request) {
    try {
      // check if the user exist in the database
      const user = await UserService.findUserByEmail(request.email);
      if (!user) {
        // if not, return a forbidden error
        return { status: false, statusCode: 403, message: 'Invalid user credentials' };
      }
      // check if the user is verified
      // if (!user.dataValues.isVerified) {
      //   // if not, return a unauthorized error
      //   return Response.unauthorized(res, 'Please verify your account');
      // }
      const match = await Utils.comparePassword(request.password, user.password);
      if (!match) {
        // if not, return a forbidden error
        return { status: false, statusCode: 403, message: 'Invalid user credentials' };
      }

      // remove user password for the user data
      // eslint-disable-next-line no-unused-vars
      const { password, ...logInUser } = user;
      // generate a token from the user data
      const token = await Token.generateToken(logInUser);
      // return a token
      // return Response.ok(res, { token });
      return { status: true, resource: { token } };
    } catch (error) {
      return {
        status: false,
        statusCode: 500,
        message: 'Unable to perform this action at this time. Try again later.'
      };
    }
  }
}

export default UserService;
