import UserService from './UserService';
import Response from '../../responses/response';

class UserController {
  static async index(req, res) {
    res.json('Main User');
  }

  static async login(req, res) {
    const response = await UserService.login(req.body);
    if (response.status) {
      return Response.success(res, response);
    }
    return Response.error(res, response);
  }
}

export default UserController;
