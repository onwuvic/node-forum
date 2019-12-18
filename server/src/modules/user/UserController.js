import UserService from './UserService';
import Response from '../../responses/response';

class UserController {
  static async index(req, res) {
    res.json('Main User');
  }

  static async login(req, res) {
    const response = await UserService.login(req.body);
    return Response.httpResponse(res, response);
  }
}

export default UserController;
