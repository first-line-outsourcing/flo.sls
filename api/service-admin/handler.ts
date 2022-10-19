import { createIconikClient } from '@helper/iconik';
import * as logger from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { Handler } from 'aws-lambda';
import { authorizeIconikCustomAction } from '../../authorizers/iconik/custom-action';
import { InitManager } from './init/InitManager';
import { UpdateIconikCredentialsManager } from './set-iconik-credentials/UpdateIconikCredentialsManager';

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

export const updateIconikCredentials: Handler<APIGatewayLambdaEvent<any>, void> = async (event) => {
  logger.debug(event);

  try {
    const body = JSON.parse(event.body);
    const iconikContext = await authorizeIconikCustomAction(body);
    const iconikClient = await createIconikClient(iconikContext);
    const manager = new UpdateIconikCredentialsManager();
    await manager.update(body);
  } catch (error) {
    logger.error(error);
  }
};