import { HttpError } from './http-error';

export class HttpUnprocessableEntityError extends HttpError {
  constructor(message = 'Unauthorized', public details?: Record<string, any>) {
    super(401, 'Unauthorized', message);
  }
}
