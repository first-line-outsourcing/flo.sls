import { HttpError } from './http-error';

export class HttpUnauthorizedError extends HttpError {
  constructor(message = 'Unprocessable Entity', details?: Record<string, any>) {
    super(422, 'Unprocessable Entity', message, details);
  }
}
