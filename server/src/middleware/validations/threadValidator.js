import JoiHelper from '../../helpers/JoiHelper';
import { createThreadSchema } from './validationSchema';

class ThreadValidator {
  static validateCreateThreadDetails(req, res, next) {
    return JoiHelper.joiValidation(req, res, next, createThreadSchema);
  }
}

export default ThreadValidator;
