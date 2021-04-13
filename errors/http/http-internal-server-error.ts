import { HttpError } from './http-error';

export class HttpInternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(500, 'Internal Server Error', message);
  }
}
