import { HttpError } from './http-error';

export class HttpBadRequestError extends HttpError {
  constructor(message = 'Bad Request', public details?: Record<string, any>) {
    super(400, 'Bad request', message);
  }
}
