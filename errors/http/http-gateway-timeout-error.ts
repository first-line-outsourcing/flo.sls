import { HttpError } from './http-error';

export class HttpGatewayTimeoutError extends HttpError {
  constructor(message = 'Gateway Timeout') {
    super(504, 'Gateway Timeout', message);
  }
}
