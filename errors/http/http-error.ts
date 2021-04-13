export class HttpError extends Error {
  constructor(public statusCode: number, public name: string, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    Error.captureStackTrace(this);
  }
}
