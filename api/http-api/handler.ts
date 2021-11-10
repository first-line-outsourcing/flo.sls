// Remove example

import { errorHandler } from '@helper/http-api/error-handler';
import { createResponse, Response } from '@helper/http-api/response';
import { log } from '@helper/logger';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

// Default HTTP API Response factory
export const defaultResponse: APIGatewayProxyHandlerV2<string> = async (event) => {
  log(event);

  try {
    return createResponse(200, 'Hi!');
  } catch (error) {
    return errorHandler(error);
  }
};

// Custom HTTP API Response factory
export const customResponse: APIGatewayProxyHandlerV2<string> = async (event) => {
  log(event);

  const response = new Response({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': false,
    'Content-Type': 'application/json',
    'My-Custom-Header': 'my-custom-value',
  });

  try {
    return response.create(200, 'Hi!');
  } catch (error) {
    return errorHandler(error, response);
  }
};
