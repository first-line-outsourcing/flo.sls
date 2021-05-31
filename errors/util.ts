import { HttpBadRequestError, HttpInternalServerError } from '@errors/http';
import { ErrorStatusCode, HttpError } from '@errors/http/http-error';
import { InputValidationError } from '@errors/runtime';
import { RuntimeError } from '@errors/runtime/runtime-error';
import { format } from '@redtea/format-axios-error';
import { AxiosError } from 'axios';

/**
 * Convert input error to corresponding instance of HttpError
 *
 * @param {Error | AxiosError | RuntimeError} error Input error
 * @returns {HttpError}
 */
export function convertToHttpError(error: Error | AxiosError | RuntimeError): HttpError {
  const axiosError = (<AxiosError>error).isAxiosError && format(<AxiosError>error);

  if (error instanceof InputValidationError) {
    return new HttpBadRequestError(error.message, { text: 'Instance InputValidationError' });
  }
  if (error instanceof RuntimeError) {
    return new HttpInternalServerError(error.message, { text: 'Instance RuntimeError' });
  }

  if (axiosError) {
    return new HttpError(
      axiosError.response?.status as ErrorStatusCode,
      axiosError.response?.statusText || 'Internal Server Error',
      axiosError.message
    );
  }

  return new HttpInternalServerError(error.message, { text: 'Unknown error' });
}
