import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { Handler } from 'aws-lambda';

export const exampleOfUseAuthorizer: Handler<APIGatewayLambdaEvent<{ message: string }>> = async (event) => {
  log('[Examples] Example of use Iconik Authorizer', event);
  try {
    /**
     * @enhancedAuthContext contains information about user and Iconik credentials
     * */
    const { body, enhancedAuthContext } = event;

    return { message: 'Magic unicorns are better than humans!' };
  } catch (error) {
    errorHandler(error);
  }
};
