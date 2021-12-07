import { HttpBadRequestError, HttpInternalServerError } from '@floteam/errors';
import { HttpError } from '@floteam/errors/http/http-error';
import { RuntimeError } from '@floteam/errors/runtime/runtime-error';
import { baseErrorHandler } from '@helper/base-error-handler';
import { AxiosError } from 'axios';

/**
 * REST API error handler
 *
 * @param {Error | HttpError | AxiosError | RuntimeError} caughtError
 * @returns {never}
 */
export function errorHandler(caughtError: Error | HttpError | AxiosError | RuntimeError): never {
  const httpError = baseErrorHandler(caughtError);
  const supportedHttpError = formatUnsupportedError(httpError);

  /**
   * The error message looks like: [404] Not Found. User does not exist
   */
  throw `[${supportedHttpError.statusCode}] ${supportedHttpError.name}. ${supportedHttpError.message}`;
}

/**
 * Format unsupported http error
 *
 * Serverless supports following status codes:
 * - 400  Bad Request
 * - 401  Unauthorized
 * - 403  Forbidden
 * - 404  Not Found
 * - 422  Unprocessable Entity
 * - 500  Internal Server Error
 * - 502  Bad Gateway
 * - 504  Gateway Timeout
 */
function formatUnsupportedError(error: HttpError): HttpError {
  if (error.statusCode === 409 || error.statusCode === 429) {
    return new HttpBadRequestError(error.message, { text: `Error with code ${error.statusCode} unsupported` });
  }
  if (error.statusCode === 503) {
    return new HttpInternalServerError(error.message, { text: `Error with code ${error.statusCode} unsupported` });
  }

  return error;
}
