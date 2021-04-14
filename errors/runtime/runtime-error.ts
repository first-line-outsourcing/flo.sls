export class RuntimeError extends Error {
  constructor(message: string) {
    super(message);
    if (Object.getPrototypeOf(this) === new.target.prototype) {
      Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    }
  }
}
