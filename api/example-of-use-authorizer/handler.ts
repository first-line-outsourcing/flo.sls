import { errorHandler } from '@helper/error-handler';
import { createIconikClient } from '@helper/iconik';
import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';
import { Handler } from 'aws-lambda';
import { IconikEnhancedAuthContext } from '../../authorizers/iconik/interfaces/context';
import { ExampleOfUseAuthorizerManager } from './example-of-use-authorizer.manager';

export const exampleInitialization: Handler<APIGatewayLambdaEvent<null>> = async (event) => {
  log('[Examples] Example create Iconik Custom Action and WebHook');
  try {
    const cloudFormation: CloudFormationService = new CloudFormationService();
    const iconikService: IconikService = createIconikClient();

    const manager: ExampleOfUseAuthorizerManager = new ExampleOfUseAuthorizerManager();
    return await manager.initialization(cloudFormation, iconikService);
  } catch (error) {
    errorHandler(error);
  }
};

export const exampleOfUseAuthorizer: Handler<APIGatewayLambdaEvent<
  null,
  null,
  null,
  null,
  IconikEnhancedAuthContext
>> = async (event, context) => {
  log('[Examples] Example of use Iconik Authorizer', event);
  try {
    const iconikEnhancedAuthContext: IconikEnhancedAuthContext = event.enhancedAuthContext;
    /**
     * @enhancedAuthContext contains information about user and Iconik credentials
     * */
    log('[Examples] iconikEnhancedAuthContext', iconikEnhancedAuthContext);

    return { message: 'Magic unicorns are better than humans!' };
  } catch (error) {
    errorHandler(error);
  }
};
