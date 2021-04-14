import { HttpError } from './http-error';

export class HttpGatewayTimeoutError extends HttpError {
  constructor(message = 'Gateway Timeout', public details?: Record<string, any>) {
    super(504, 'Gateway Timeout', message);
  }
}
