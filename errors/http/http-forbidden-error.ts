import { HttpError } from './http-error';

export class HttpForbiddenError extends HttpError {
  constructor(message = 'Forbidden', details?: Record<string, any>) {
    super(403, 'Forbidden', message, details);
  }
}
