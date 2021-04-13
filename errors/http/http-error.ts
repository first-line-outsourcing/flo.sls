export class HttpError extends Error {
  constructor(public statusCode: number, public name: string, message: string) {
    super(message);
  }
}
