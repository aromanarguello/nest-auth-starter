import Joi from 'joi';

export const configValidationSchema = Joi.object({
  database: {
    type: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  },
  app: {
    port: Joi.number().required(),
  },
});
