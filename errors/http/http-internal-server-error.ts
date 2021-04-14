import { HttpError } from './http-error';

export class HttpInternalServerError extends HttpError {
  constructor(message = 'Internal Server Error', public details?: Record<string, any>) {
    super(500, 'Internal Server Error', message);
  }
}
