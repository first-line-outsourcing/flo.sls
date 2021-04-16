import { errorHandler } from '@helper/error-handler';
import { createIconikClient } from '@helper/iconik';
import { log } from '@helper/logger';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';
import { Handler } from 'aws-lambda';
import { SecurityManager } from './security.manager';

export const initialization: Handler<null> = async (event) => {
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

export const refreshToken: Handler<unknown> = async (event) => {
  log('[security] refresh token', event);
  try {
  } catch (error) {
    errorHandler(error);
  }
};

export const invalidateToken: Handler<unknown> = async (event) => {
  log('[security] invalidate token', event);
  try {
  } catch (error) {
    errorHandler(error);
  }
};
