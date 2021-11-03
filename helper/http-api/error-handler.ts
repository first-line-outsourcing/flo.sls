import { HttpError } from '@floteam/errors/http/http-error';
import { RuntimeError } from '@floteam/errors/runtime/runtime-error';
import { APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { AxiosError } from 'axios';
import { baseErrorHandler } from '../base-error-handler';
import { defaultResponse, Response } from './response';

/**
 * HTTP API error handler
 *
 * @param {Error | HttpError | AxiosError | RuntimeError} caughtError
 * @param {Response} httpApiResponse
 * @returns {APIGatewayProxyResult}
 */
export function errorHandler(
  caughtError: Error | HttpError | AxiosError | RuntimeError,
  httpApiResponse: Response = defaultResponse
): APIGatewayProxyResult {
  const httpError = baseErrorHandler(caughtError);
  return httpApiResponse.error(httpError.statusCode, httpError.message, httpError.details);
}
