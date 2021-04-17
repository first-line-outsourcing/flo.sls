import { errorHandler } from '@helper/error-handler';
import { createIconikClient } from '@helper/iconik';
import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';
import { Handler } from 'aws-lambda';
import { InvalidateTokensBody } from './security.interface';
import { SecurityManager } from './security.manager';

export const initialization: Handler<APIGatewayLambdaEvent<{ message: string }>> = async (event) => {
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

export const changeRefreshTokenPeriod: Handler<unknown> = async (event) => {
  log('[security] change refresh token period', event);
  try {
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

export const invalidateTokens: Handler<APIGatewayLambdaEvent<InvalidateTokensBody>> = async (event) => {
  log('[security] invalidate token', event);
  try {
    const iconikService: IconikService = createIconikClient();

    const { tokens }: InvalidateTokensBody = event.body;

    const manager: SecurityManager = new SecurityManager();
    return await manager.invalidateTokens(iconikService, tokens);
  } catch (error) {
    errorHandler(error);
  }
};
