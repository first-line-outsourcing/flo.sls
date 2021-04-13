import { HttpError } from './http-error';

export class HttpBadRequestError extends HttpError {
  constructor(message: string = 'Bad request') {
    super(400, 'Bad request', message);
  }
}
