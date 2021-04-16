export class RuntimeError extends Error {
  constructor(message: string, public details?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
  }
}
