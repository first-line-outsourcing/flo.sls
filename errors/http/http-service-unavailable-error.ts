import { HttpError } from './http-error';

export class HttpServiceUnavailableError extends HttpError {
  constructor(message = 'Service Unavailable') {
    super(503, 'Service Unavailable', message);
  }
}
