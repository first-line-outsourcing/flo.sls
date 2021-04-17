import { HttpError } from './http-error';

export class HttpGatewayTimeoutError extends HttpError {
  constructor(message = 'Gateway Timeout', details?: Record<string, any>) {
    super(504, 'Gateway Timeout', message, details);
  }
}
