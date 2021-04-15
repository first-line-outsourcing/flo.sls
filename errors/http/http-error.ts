export type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503 | 504;

export class HttpError extends Error {
  constructor(
    public statusCode: ErrorStatusCode,
    public name: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
  }
}
