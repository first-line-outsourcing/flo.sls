import { HttpError } from './http-error';

export class HttpConflictError extends HttpError {
  constructor(message: string = 'Conflict') {
    super(409, 'Conflict', message);
  }
}
