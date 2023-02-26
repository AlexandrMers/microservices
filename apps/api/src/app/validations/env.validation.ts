import * as Joi from 'joi';

export const ValidationSchemaOfEnvVariables = Joi.object({
  PORT: Joi.number().default(3334),

  JWT_SECRET: Joi.string().required(),

  AMQP_EXCHANGE: Joi.string().required(),
  AMQP_USER: Joi.string().required(),
  AMQP_PASSWORD: Joi.string().required(),
  AMQP_HOST: Joi.string().required(),
});
