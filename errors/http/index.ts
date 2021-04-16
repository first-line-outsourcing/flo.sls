export { HttpBadGatewayError } from './http-bad-gateway-error';
export { HttpBadRequestError } from './http-bad-request-error';
export { HttpConflictError } from './http-conflict-error';
export { HttpForbiddenError } from './http-forbidden-error';
export { HttpGatewayTimeoutError } from './http-gateway-timeout-error';
export { HttpInternalServerError } from './http-internal-server-error';
export { HttpNotFoundError } from './http-not-found-error';
export { HttpServiceUnavailableError } from './http-service-unavailable-error';
export { HttpTooManyRequestsError } from './http-too-many-requests-error';
export { HttpUnauthorizedError } from './http-unauthorized-error';
export { HttpUnprocessableEntityError } from './http-unprocessable-entity-error';

/**
 * Example of usage:
 * if (!mediaInfoUrl.url)
      throw new HttpBadRequestError("The param 'url' is required.");
 * */
