import { HttpError } from './http-error';

export class HttpUnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized', details?: Record<string, any>) {
    super(401, 'Unauthorized', message, details);
  }
}
