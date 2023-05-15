// DELETE THIS FILE
import { errorHandler } from '@helper/http-api/error-handler';
import { createResponse } from '@helper/http-api/response';
import { logger } from '@helper/logger';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2<string> = async (event) => {
  logger.info('event', { event });

  try {
    return createResponse(200, 'Hi!');
  } catch (error) {
    return errorHandler(error);
  }
};
