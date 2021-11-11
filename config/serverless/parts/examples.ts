import { AWSPartitial } from '../types';

export const examplesConfig: AWSPartitial = {
  provider: {
    httpApi: {
      authorizers: {
        exampleAuthorizer: {
          type: 'request',
          enableSimpleResponses: true,
          functionName: 'exampleAuthorizerHttpApi',
          identitySource: '$request.header.Authorization',
        },
      },
    },
  },
  functions: {
    // prefix "api" for API Gateway Lambda triggers
    apiExampleHttpApiDefaultResponse: {
      handler: 'api/http-api/handler.defaultResponse',
      memorySize: 128,
      events: [
        {
          httpApi: {
            path: '/example/http-api/default-response',
            method: 'get',
            authorizer: {
              name: 'exampleAuthorizer',
            },
          },
        },
      ],
    },
    // prefix "api" for API Gateway Lambda triggers
    apiExampleHttpApiCustomResponse: {
      handler: 'api/http-api/handler.customResponse',
      memorySize: 128,
      events: [
        {
          httpApi: {
            path: '/example/http-api/custom-response',
            method: 'get',
          },
        },
      ],
    },
    // prefix "api" for API Gateway Lambda triggers
    apiExampleRestApiDefaultResponse: {
      handler: 'api/rest-api/handler.handler',
      memorySize: 128,
      events: [
        {
          http: {
            path: 'example/rest-api/default-response',
            method: 'post',
            integration: 'lambda',
            cors: true,
            authorizer: {
              name: 'exampleAuthorizerRestApi',
            },
            response: {
              headers: {
                'Access-Control-Allow-Origin': "'*'",
                'Content-Type': "'application/json'",
              },
              template: "$input.json('$')",
            },
          },
        },
      ],
    },
    exampleAuthorizerHttpApi: {
      handler: 'api/auth/handler.httpApiSimple',
      memorySize: 128,
    },
    exampleAuthorizerRestApi: {
      handler: 'api/auth/handler.authentication',
      memorySize: 128,
    },
  },
};
