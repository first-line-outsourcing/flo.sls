import { RuntimeError } from './runtime-error';

export class InputValidationError extends RuntimeError {
  constructor(message, public details?: Record<string, any>) {
    super(message);
  }
}
