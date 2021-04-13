import { HttpError } from './http-error';

export class HttpForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(403, 'Forbidden', message);
  }
}
