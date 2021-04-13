import { HttpError } from './http-error';

export class HttpUnprocessableEntityError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(401, 'Unauthorized', message);
  }
}
