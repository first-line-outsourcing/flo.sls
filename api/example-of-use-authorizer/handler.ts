import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { APIGatewayLambdaEvent } from '@interfaces/api-gateway-lambda.interface';
import { Handler } from 'aws-lambda';

export const exampleOfUseAuthorizer: Handler<APIGatewayLambdaEvent<{ message: string }>> = async (event) => {
  log('[examples] example of use Iconik Authorizer', event);
  try {
    return { message: 'test' };
  } catch (error) {
    errorHandler(error);
  }
};
