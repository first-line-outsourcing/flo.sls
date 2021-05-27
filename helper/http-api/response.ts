import { APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

export type Headers = APIGatewayProxyResult['headers'];

const defaultHeaders: Headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': false,
  'Content-Type': 'application/json',
};

/**
 * HTTP API response factory
 */
export class Response {
  public headers: Headers | undefined;

  /**
   * Constructor
   *
   * @param headers Default headers. Provide null to disable default headers.
   */
  constructor(headers: Headers | null = defaultHeaders) {
    this.setHeaders(headers);
  }

  /**
   * Set default headers for response
   *
   * @param {Headers | null} headers Default headers. Provide null to disable default headers.
   */
  setHeaders(headers: Headers | null) {
    this.headers = headers === null ? undefined : headers;
  }

  /**
   * Create HTTP API response
   *
   * @param {number} httpStatus HTTP status
   * @param body Response body
   * @param {Headers} headers Custom headers
   * @returns {APIGatewayProxyResult}
   */
  create(httpStatus: number, body?: any, headers?: Headers): APIGatewayProxyResult {
    return {
      statusCode: httpStatus,
      headers: {
        ...this.headers,
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : '',
    };
  }

  /**
   * Create HTTP API error response
   *
   * @param {number} httpStatus HTTP status
   * @param {string} message Error message
   * @param {Record<string, any>} details Error details
   * @param {Headers} headers Custom headers
   * @returns {APIGatewayProxyResult}
   */
  error(httpStatus: number, message: string, details?: Record<string, any>, headers?: Headers): APIGatewayProxyResult {
    const body = {
      status: httpStatus,
      message,
      details,
    };

    return this.create(httpStatus, body, headers);
  }
}

/**
 * Default HTTP API response factory instance.
 *
 * Set custom default headers:
 * ```
 * defaultResponse.setHeaders({...headers})
 * ```
 * @type {Response}
 */
export const defaultResponse = new Response();

/**
 * Create HTTP API response. The same as defaultResponse.create.
 *
 * @param {number} httpStatus HTTP status
 * @param body Response body
 * @param {Headers} headers Custom headers
 * @returns {APIGatewayProxyResult}
 */
export function createResponse(httpStatus: number, body?: any, headers?: Headers): APIGatewayProxyResult {
  return defaultResponse.create(httpStatus, body, headers);
}

/**
 * Create HTTP API error response. The same as defaultResponse.error.
 *
 * @param {number} httpStatus HTTP status
 * @param {string} message Error message
 * @param {Record<string, any>} details Error details
 * @param {Headers} headers Custom headers
 * @returns {APIGatewayProxyResult}
 */
export function errorResponse(
  httpStatus: number,
  message: string,
  details?: Record<string, any>,
  headers?: Headers
): APIGatewayProxyResult {
  return defaultResponse.error(httpStatus, message, details, headers);
}
