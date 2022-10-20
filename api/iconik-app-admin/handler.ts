import { createIconikClient } from '@helper/iconik';
import * as logger from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { Handler } from 'aws-lambda';
import { authorizeIconikCustomAction } from '../../authorizers/iconik/custom-action';
import { InitManager } from './init/InitManager';
import { UpdateAppTokenManager } from './update-app-token/UpdateAppTokenManager';

export type UpdateEnvironmentLambda = APIGatewayLambdaEvent<any>;

export const init: Handler<APIGatewayLambdaEvent<any>, void> = async (event) => {
  logger.debug(event);

  try {
    const body = JSON.parse(event.body);
    const iconikContext = await authorizeIconikCustomAction(body);
    const iconikClient = await createIconikClient(iconikContext);
    const manager = new InitManager(iconikClient);
    await manager.init();
  } catch (error) {
    logger.error(error);
  }
};

export const updateAppToken: Handler<APIGatewayLambdaEvent<any>, void> = async (event) => {
  logger.debug(event);

  try {
    const body = JSON.parse(event.body);
    const iconikContext = await authorizeIconikCustomAction(body);
    const iconikClient = await createIconikClient(iconikContext);
    const manager = new UpdateAppTokenManager();
    await manager.update(body);
  } catch (error) {
    logger.error(error);
  }
};