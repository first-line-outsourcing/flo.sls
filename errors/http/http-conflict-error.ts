import { HttpError } from './http-error';

export class HttpConflictError extends HttpError {
  constructor(message = 'Conflict', details?: Record<string, any>) {
    super(409, 'Conflict', message, details);
  }
}
