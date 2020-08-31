import { APIGatewayEventIdentity } from 'aws-lambda';

export type ObjectType = { [name: string]: string };

export interface APIGatewayLambdaEvent<BodyType, PathType = ObjectType, QueryType = ObjectType> {
  body: BodyType;
  method: string;
  principalId: string;
  enhancedAuthContext: {
    principalId: string;
    integrationLatency: string;
  };
  stage: string;
  cognitoPoolClaims: {
    sub: string;
  };
  headers: APIGatewayLambdaEventHeaders & ObjectType;
  path: PathType;
  query: QueryType;
  identity: APIGatewayEventIdentity;
  stageVariables: ObjectType;
  requestPath: string;
}

export interface APIGatewayLambdaEventHeaders {
  Accept: string;
  'Accept-Charset': string;
  'Accept-Encoding': string;
  'Accept-Language': string;
  Authorization: string;
  'CloudFront-Forwarded-Proto': string;
  'CloudFront-Is-Desktop-Viewer': string;
  'CloudFront-Is-Mobile-Viewer': string;
  'CloudFront-Is-SmartTV-Viewer': string;
  'CloudFront-Is-Tablet-Viewer': string;
  'CloudFront-Viewer-Country': string;
  'content-type': string;
  Host: string;
  'upgrade-insecure-requests': string;
  'User-Agent': string;
  Via: string;
  'X-Amz-Cf-Id': string;
  'X-Amzn-Trace-Id': string;
  'X-Forwarded-For': string;
  'X-Forwarded-Port': string;
  'X-Forwarded-Proto': string;
}
