import { getEnv } from '@helper/environment';
import { errorHandler } from '@helper/error-handler';
import { createIconikClient } from '@helper/iconik';
import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';
import { CustomActionPayload } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { Handler } from 'aws-lambda';
import { SecurityManager } from './security.manager';

export const initialization: Handler<APIGatewayLambdaEvent<null>> = async (event) => {
  log('[security] initialization', event);
  try {
    const cloudFormation: CloudFormationService = new CloudFormationService();
    const iconikService: IconikService = createIconikClient();

    const manager: SecurityManager = new SecurityManager();
    return await manager.initialization(iconikService, cloudFormation);
  } catch (error) {
    errorHandler(error);
  }
};

export const changeRefreshTokenPeriod: Handler<APIGatewayLambdaEvent<CustomActionPayload>> = async (event) => {
  log('[security] change refresh token period', event);
  try {
    const refreshHours = event.body.metadata_values.win_RefreshHours.field_values[0].value;
    const refreshTokenLambdaArn: string = getEnv('REFRESH_TOKEN_LAMBDA_ARN');
    const invalidateTokensLambdaArn: string = getEnv('INVALIDATE_TOKENS_LAMBDA_ARN');

    const manager = new SecurityManager();
    return await manager.changeRefreshTokenPeriod(refreshHours, refreshTokenLambdaArn, invalidateTokensLambdaArn);
  } catch (error) {
    errorHandler(error);
  }
};

export const refreshToken: Handler<APIGatewayLambdaEvent<null>> = async (event) => {
  log('[security] refresh token', event);
  try {
    const iconikService: IconikService = createIconikClient();

    const manager: SecurityManager = new SecurityManager();
    return await manager.refreshToken(iconikService);
  } catch (error) {
    errorHandler(error);
  }
};

export const invalidateTokens: Handler<APIGatewayLambdaEvent<null>> = async (event) => {
  log('[security] invalidate token', event);
  try {
    const iconikService: IconikService = createIconikClient();

    const manager: SecurityManager = new SecurityManager();
    return await manager.invalidateTokens(iconikService);
  } catch (error) {
    errorHandler(error);
  }
};
