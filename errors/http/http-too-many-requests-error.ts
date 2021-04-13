import { HttpError } from './http-error';

export class HttpTooManyRequestsError extends HttpError {
  constructor(message: string = 'Too Many Requests') {
    super(429, 'Too Many Requests', message);
  }
}
