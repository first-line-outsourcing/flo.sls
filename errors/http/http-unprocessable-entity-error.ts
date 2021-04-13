import { HttpError } from './http-error';

export class HttpUnprocessableEntityError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(401, 'Unauthorized', message);
  }
}
