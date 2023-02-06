import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'local').default('development'),

  /**
   * * MySQL Database
   */
  MYSQL_HOST: Joi.string().default('localhost'),
  MYSQL_PORT: Joi.number().default(3306),
  MYSQL_DB_NAME: Joi.string().required(),
  MYSQL_USERNAME: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
});
