import * as Joi from '@hapi/joi';

export const logInInputSchema = Joi.object().keys({
  // email: Joi.string().trim().email().lowercase().required(),
  // password: Joi.string().trim().min(6).required().strict()
});

export const createThreadSchema = Joi.object().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
  channelId: Joi.number().required(),
});
