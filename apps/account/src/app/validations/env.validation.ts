import * as Joi from 'joi';

export const ValidationSchemaOfEnvVariables = Joi.object({
  PORT: Joi.number().default(3333),
  JWT_SECRET: Joi.string().required(),
  MONGO_LOGIN: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_DATABASE: Joi.string().required(),
  MONGO_AUTHDATABASE: Joi.string().required(),

  AMQP_EXCHANGE: Joi.string().required(),
  AMQP_USER: Joi.string().required(),
  AMQP_PASSWORD: Joi.string().required(),
  AMQP_HOST: Joi.string().required(),
  AMQP_QUEUE: Joi.string().required(),
});
