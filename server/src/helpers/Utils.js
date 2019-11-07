import bcrypt from 'bcrypt';

class Utils {
  static async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  static async encryptPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}

export default Utils;
