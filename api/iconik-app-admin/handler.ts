import { createIconikClient } from '@helper/iconik';
import * as logger from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { Handler } from 'aws-lambda';
import { authorizeIconikCustomAction } from '../../authorizers/iconik/custom-action';
import { InitManager } from './init/InitManager';
import { UpdateAppTokenManager } from './update-app-token/UpdateAppTokenManager';

export type UpdateEnvironmentLambda = APIGatewayLambdaEvent<any>;

/**
 * Install iconik app admin to iconik
 *
 * @param {APIGatewayLambdaEvent<any>} event
 * @returns {Promise<void>}
 */
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

/**
 * Update iconik app token in the SSM parameters store.
 * Accepts App ID and App Auth Token from the metadata form.
 *
 * @param {APIGatewayLambdaEvent<any>} event
 * @returns {Promise<void>}
 */
export const updateAppToken: Handler<APIGatewayLambdaEvent<any>, void> = async (event) => {
  logger.debug(event);

  try {
    const body = JSON.parse(event.body);
    await authorizeIconikCustomAction(body);
    const manager = new UpdateAppTokenManager();
    await manager.update(body);
  } catch (error) {
    logger.error(error);
  }
};
