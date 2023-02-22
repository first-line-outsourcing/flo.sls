// DELETE THIS FILE
import { errorHandler } from '@helper/http-api/error-handler';
import { createResponse } from '@helper/http-api/response';
import { log } from '@helper/logger';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2<string> = async (event) => {
  log(event);

  try {
    return createResponse(200, 'Hi!');
  } catch (error) {
    return errorHandler(error);
  }
};
