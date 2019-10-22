import Response from '../responses/response';
import Token from '../helpers/Token';

class Authentication {
  static async tokenAuthentication(req, res, next) {
    // add 'authorization' option to the request headers
    const bearerHeader = req.get('authorization');
    if (!bearerHeader) {
      return Response.unauthorized(res, 'No token provided');
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    if (bearer[0] !== process.env.BEARER) {
      return Response.badRequest(res, 'bearer not understood');
    }

    try {
      // verify user token
      const decoded = await Token.verifyToken(bearerToken);
      // add the user object subsequent request object
      req.user = decoded.userObject;
      // move to the next middleware or controller
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return Response.unauthorized(res, 'Session timed out, please login again');
      }
      return Response.unauthorized(res, 'Error authenticating, please login again');
    }
  }
}

export default Authentication;
