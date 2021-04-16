import { HttpError } from './http-error';

export class HttpTooManyRequestsError extends HttpError {
  constructor(message = 'Too Many Requests', details?: Record<string, any>) {
    super(429, 'Too Many Requests', message, details);
  }
}
