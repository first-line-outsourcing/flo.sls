import { HttpError } from './http-error';

export class HttpServiceUnavailableError extends HttpError {
  constructor(message = 'Service Unavailable', public details?: Record<string, any>) {
    super(503, 'Service Unavailable', message);
  }
}
