import { HttpError } from './http-error';

export class HttpBadGatewayError extends HttpError {
  constructor(message = 'Bad Gateway', details?: Record<string, any>) {
    super(502, 'Bad Gateway', message, details);
  }
}
