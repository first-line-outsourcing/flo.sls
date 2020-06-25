import sequelize from '@services/sequelize';
import * as models from '../models/PostgreSQL';

const connection: { isConnected?: boolean } = {};

/**
 * context.callbackWaitsForEmptyEventLoop = false should be set only for non-async handlers
 * for more information, read this https://docs.amazonaws.cn/en_us/lambda/latest/dg/nodejs-handler.html
 */
export const connect = async () => {
  if (connection.isConnected) {
    return models;
  }
  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  return models;
};
