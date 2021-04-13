import { HttpError } from './http-error';

export class HttpGatewayTimeoutError extends HttpError {
  constructor(message: string = 'Gateway Timeout') {
    super(504, 'Gateway Timeout', message);
  }
}
