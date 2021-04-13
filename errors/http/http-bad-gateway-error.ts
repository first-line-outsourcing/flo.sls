import { HttpError } from './http-error';

export class HttpBadGatewayError extends HttpError {
  constructor(message = 'Bad Gateway') {
    super(502, 'Bad Gateway', message);
  }
}
