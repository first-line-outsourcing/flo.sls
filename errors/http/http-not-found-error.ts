import { HttpError } from './http-error';

export class HttpNotFoundError extends HttpError {
  constructor(message = 'Not Found', public details?: Record<string, any>) {
    super(404, 'Not Found', message);
  }
}
