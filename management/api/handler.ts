import { createIconikClient } from '@helper/iconik';
import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { IconikService } from '@workflowwin/iconik-api';
import { MetadataOutputSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { Handler } from 'aws-lambda';
import { EnvironmentInitService } from './environment.init.service';
import { EnvironmentManager } from './environment.manager';

export const decryptEnvironment: any = async (event) => {
  log('apiRegenerateProxyCustomAction', event);
  try {
    const manager = new EnvironmentManager();
    return await manager.decryptVariables();
  } catch (error) {
    log(error);
  }
};

export type UpdateEnvironmentLambda = APIGatewayLambdaEvent<MetadataOutputSchema>;
export const apiUpdateEnvironment: Handler<UpdateEnvironmentLambda, void> = async (event) => {
  log('apiRegenerateProxyCustomAction', event);
  try {
    const manager = new EnvironmentManager();
    return await manager.updateEnvironment(event.body);
  } catch (error) {
    log(error);
  }
};

export const updateEnvironmentFromSSM = async (event) => {
  log('updateEnvironmentFromSSM', event);
  try {
    const manager = new EnvironmentManager();
    return await manager.getEnvironmentFromSSM();
  } catch (error) {
    log(error);
  }
};

export const apiUpdateEnvironmentInitialization = async () => {
  log('apiUpdateEnvironmentInitialization start');
  try {
    const manager = new EnvironmentManager();
    const iconik: IconikService = createIconikClient();
    const initService: EnvironmentInitService = new EnvironmentInitService(iconik);
    return await manager.initialization(initService);
  } catch (error) {
    log(error);
  }
}