import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { SSMService } from '@services/ssm.servise';
import { MetadataOutputSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { Handler } from 'aws-lambda';
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
  log('apiGetEnvironmentFromSSM', event);
  try {
    const manager = new EnvironmentManager();
    const ssm: SSMService = new SSMService();
    return await manager.getEnvironmentFromSSM(ssm);
  } catch (error) {
    log(error);
  }
};
