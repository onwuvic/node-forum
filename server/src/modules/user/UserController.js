import UserService from './UserService';
import Response from '../../responses/response';
import Token from '../../helpers/Token';
import Utils from '../../helpers/Utils';

class UserController {
  static async index(req, res) {
    res.json('Main User');
  }

  static async login(req, res) {
    try {
      // check if the user exist in the database
      const user = await UserService.findUserByEmail(req.body.email);
      if (!user) {
        // if not, return a forbidden error
        return Response.forbidden(res, 'Invalid user credentials');
      }
      // check if the user is verified
      // if (!user.dataValues.isVerified) {
      //   // if not, return a unauthorized error
      //   return Response.unauthorized(res, 'Please verify your account');
      // }
      // check if the password supplied by the user match the account being accessed
      const match = await Utils.comparePassword(req.body.password, user.password);
      if (!match) {
        // if not, return a forbidden error
        return Response.forbidden(res, 'Invalid user credentials');
      }
      // remove user password for the user data
      // eslint-disable-next-line no-unused-vars
      const { password, ...logInUser } = user;

      // generate a token from the user data
      const token = await Token.generateToken(logInUser);
      // return a token
      return Response.ok(res, { token });
    } catch (error) {
      return Response.error(
        res, 'Server Error', 'Unable to perform this action at this time. Try again.', error
      );
    }
  }
}

export default UserController;
