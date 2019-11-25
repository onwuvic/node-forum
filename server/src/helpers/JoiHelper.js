import * as Joi from '@hapi/joi';
import Response from '../responses/response';

const validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true // remove unknown keys from the validated data
};

class JoiHelper {
  static validateSubmission(submission, schema) {
    const { error, value } = Joi.validate(submission, schema, validationOptions);
    if (error) {
      return JoiHelper.handleError(error.details);
    }
    return value;
  }

  static joiValidation(req, res, next, schema) {
    const validate = JoiHelper.validateSubmission(req.body, schema);
    if (validate.error) {
      // eslint-disable-next-line no-unused-vars
      const { error, ...rest } = validate;
      // const errors = JoiHelper.refine(rest);
      return Response.badRequest(res, rest);
    }
    req.body = validate;
    return next();
  }

  // static refine(error) {
  //   const errors = [];
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const key of Object.keys(error)) {
  //     errors.push(error[key]);
  //   }
  //   return errors;
  // }

  static handleError(errorDetails) {
    const errorObject = { error: 'validation error' };
    errorDetails.forEach(({
      message, type, context, context: { label }
    }) => {
      switch (type) {
        case 'any.empty':
          errorObject[`${label}`] = `${label} is not allowed to be empty`;
          break;
        case 'any.required':
          errorObject[`${label}`] = `Please provide ${label}`;
          break;
        case 'any.allowOnly':
          errorObject[`${label}`] = `only ${context.valids} are allowed`;
          break;
        case 'number.base':
          errorObject[`${label}`] = `${label} should be a number`;
          break;
        case 'number.min':
          errorObject[`${label}`] = `${label} should not be less than ${context.limit}`;
          break;
        case 'number.max':
          errorObject[`${label}`] = `${label} should not be greater than ${context.limit}`;
          break;
        case 'string.email':
          errorObject[`${label}`] = 'please provide a valid email address';
          break;
        case 'string.min':
          errorObject[`${label}`] = `${label} should not be less than ${context.limit}`;
          break;
        case 'string.regex.base':
          errorObject[`${label}`] = `please provide a valid ${label}`;
          break;
        default:
          errorObject[`${label}`] = `${message}`;
      }
    });
    return errorObject;
  }
}

export default JoiHelper;
