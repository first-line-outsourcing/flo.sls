export type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503 | 504;

export class HttpError extends Error {
  constructor(public statusCode: ErrorStatusCode, public name: string, message: string) {
    super(message);
    if (Object.getPrototypeOf(this) === new.target.prototype) {
      Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    }
    Error.captureStackTrace(this);
  }
}
