import sequelize from '@services/sequelize';
import * as models from '../models/PostgreSQL';

const connection: { isConnected?: boolean } = {};

////////////////////////////////////////////////////////////////////////////////////////////////////
export const connect = async context => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (connection.isConnected) {
    return models;
  }
  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  return models;
};
