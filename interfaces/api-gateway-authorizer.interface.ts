// TYPINGS IS UNDER DEVELOPMENT
// https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html#http-api-lambda-authorizer.payload-format

import {
  APIGatewayRequestAuthorizerEventHeaders,
  APIGatewayRequestAuthorizerEventPathParameters,
  APIGatewayRequestAuthorizerEventQueryStringParameters,
  APIGatewayRequestAuthorizerEventStageVariables,
} from 'aws-lambda/trigger/api-gateway-authorizer';

export interface APIGatewayEventRequestContextWithAuthorizerHttpApiPayloadV2 {
  accountId: string;
  apiId: string;
  // TODO: typings
  authentication?: unknown;
  domainName: string;
  domainPrefix: string;
  http: {
    method: string;
    path: string;
    protocol: string;
    sourceIp: string;
    userAgent: string;
  };
  requestId: string;
  routeKey: string;
  stage: string;
  time: string;
  timeEpoch: number;
}

export interface APIGatewayRequestAuthorizerHttpApiPayloadV2Event {
  version: '2.0';
  type: 'REQUEST';
  routeArn: string;
  identitySource?: string[];
  routeKey: string;
  routePath: string;
  rawQueryString: string;
  cookies?: string[];
  path: string;
  httpMethod: string;
  headers: APIGatewayRequestAuthorizerEventHeaders | null;
  pathParameters: APIGatewayRequestAuthorizerEventPathParameters | null;
  queryStringParameters: APIGatewayRequestAuthorizerEventQueryStringParameters | null;
  stageVariables: APIGatewayRequestAuthorizerEventStageVariables | null;
  requestContext: APIGatewayEventRequestContextWithAuthorizerHttpApiPayloadV2;
}

export interface APIGatewayAuthorizerSimpleResult<C = any> {
  isAuthorized: boolean;
  context?: C;
}
