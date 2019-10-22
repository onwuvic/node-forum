import jwt from 'jsonwebtoken';

class Token {
  static async generateToken(userObject) {
    const token = await jwt.sign({ userObject }, process.env.JWTKEY, {
      expiresIn: process.env.TOKEN_EXPIRATION
    });
    return token;
  }

  static async verifyToken(token) {
    const decodedData = await jwt.verify(token, process.env.JWTKEY);
    return decodedData;
  }
}

export default Token;
