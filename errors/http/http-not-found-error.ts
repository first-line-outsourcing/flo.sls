import { HttpError } from './http-error';

export class HttpNotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(404, 'Not Found', message);
  }
}
