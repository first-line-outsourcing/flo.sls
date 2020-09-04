import sequelize from '@services/sequelize';

const connection: { isConnected?: boolean } = {};

/**
 * context.callbackWaitsForEmptyEventLoop = false should be set only for non-async handlers
 * for more information, read this https://docs.amazonaws.cn/en_us/lambda/latest/dg/nodejs-handler.html
 */
export const connect = async (): Promise<undefined> => {
  if (connection.isConnected) {
    return;
  }
  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
};
