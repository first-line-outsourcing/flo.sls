export type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503 | 504;
export type ErrorTypes = 'BadRequest' | 'Unauthorized' | 'Forbidden' | 'NotFound' | 'Conflict' | 'UnprocessableEntity' |
  'TooManyRequests' | 'InternalServerError' | 'BadGateway' | 'ServiceUnavailable' | 'GatewayTimeout';

export type CommonErrorsSchema = Readonly<{
  [type in ErrorTypes]: CommonErrorSchema;
}>;

export type CommonErrorSchema = Readonly<{
  name: string;
  statusCode: ErrorStatusCode;
}>;

export const CommonErrors: CommonErrorsSchema = {
  BadRequest: {
    name: 'Bad Request',
    statusCode: 400,
  },
  Unauthorized: {
    name: 'Unauthorized',
    statusCode: 401,
  },
  Forbidden: {
    name: 'Forbidden',
    statusCode: 403,
  },
  NotFound: {
    name: 'Not Found',
    statusCode: 404,
  },
  Conflict: {
    name: 'Conflict',
    statusCode: 409,
  },
  UnprocessableEntity: {
    name: 'Unprocessable Entity',
    statusCode: 422,
  },
  TooManyRequests: {
    name: 'Too Many Requests',
    statusCode: 429,
  },
  InternalServerError: {
    name: 'Internal Server Error',
    statusCode: 500,
  },
  BadGateway: {
    name: 'Bad Gateway',
    statusCode: 502,
  },
  ServiceUnavailable: {
    name: 'Service Unavailable',
    statusCode: 503,
  },
  GatewayTimeout: {
    name: 'Gateway Timeout',
    statusCode: 504,
  }
};

/**
 * Centralized error object that derives from Node’s Error
 */
export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: ErrorStatusCode;
  constructor(error: CommonErrorSchema, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    this.name = error.name;
    this.statusCode = error.statusCode;
    Error.captureStackTrace(this);
  }
}

/**
 * Example of usage
 */

// if (!user)
//   throw new AppError(commonErrors.NotFound, 'User does not exist');
