import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { Handler } from 'aws-lambda';
import { IconikEnhancedAuthContext } from '../../authorizers/iconik/interfaces/context';

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
