import JoiHelper from '../../helpers/JoiHelper';
import { createReplySchema } from './validationSchema';

class ReplyValidator {
  static validateCreateReplyDetails(req, res, next) {
    return JoiHelper.joiValidation(req, res, next, createReplySchema);
  }
}

export default ReplyValidator;
