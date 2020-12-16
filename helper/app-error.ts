/**
 * This file contains the class that derives from Node.js Error class
 * It should be used for providing custom errors with the proper structure
 */

export type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503 | 504;
export type ErrorTypes =
  | 'BadRequest'
  | 'Unauthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'Conflict'
  | 'UnprocessableEntity'
  | 'TooManyRequests'
  | 'InternalServerError'
  | 'BadGateway'
  | 'ServiceUnavailable'
  | 'GatewayTimeout';

export type CommonErrorsSchema = Readonly<
  {
    [type in ErrorTypes]: CommonErrorSchema;
  }
>;

export type CommonErrorSchema = Readonly<{
  name: string;
  statusCode: ErrorStatusCode;
}>;

export const CommonErrors: CommonErrorsSchema = {
  /**
   * The user provides wrong data
   */
  BadRequest: {
    name: 'Bad Request',
    statusCode: 400,
  },
  /**
   * The user's credentials are invalid.
   * For example, the user doesn't provide a token or provides invalid or expired token
   */
  Unauthorized: {
    name: 'Unauthorized',
    statusCode: 401,
  },
  /**
   * The user doesn't have the proper rights to make this request
   */
  Forbidden: {
    name: 'Forbidden',
    statusCode: 403,
  },
  /**
   * The requested resource isn't found
   */
  NotFound: {
    name: 'Not Found',
    statusCode: 404,
  },
  /**
   * The requested resource has the conflict
   * For example, if versioning were being used and the representation being PUT included changes
   * to a resource that conflict with those made by an earlier (third-party) request,
   * the origin server might use a 409 response to indicate that it can't complete the request.
   */
  Conflict: {
    name: 'Conflict',
    statusCode: 409,
  },
  /**
   * The user provides the entity that can't be processed. For example, this error condition
   * may occur if an XML request body contains well-formed (i.e., syntactically correct),
   * but semantically erroneous, XML instructions.
   */
  UnprocessableEntity: {
    name: 'Unprocessable Entity',
    statusCode: 422,
  },
  /**
   * The user exceed rate limits
   */
  TooManyRequests: {
    name: 'Too Many Requests',
    statusCode: 429,
  },
  /**
   * An unexpected error occurred
   */
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
  },
};

/**
 * Centralized error object that derives from Node.js Error
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
