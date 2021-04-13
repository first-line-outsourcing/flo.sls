import { HttpError } from './http-error';

export class HttpUnauthorizedError extends HttpError {
  constructor(message = 'Unprocessable Entity') {
    super(422, 'Unprocessable Entity', message);
  }
}
