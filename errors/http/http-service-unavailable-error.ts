import { HttpError } from './http-error';

export class HttpServiceUnavailableError extends HttpError {
  constructor(message = 'Service Unavailable', details?: Record<string, any>) {
    super(503, 'Service Unavailable', message, details);
  }
}
