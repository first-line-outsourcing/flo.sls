import { Ref } from '../cf-intristic-fn';
import { AWSPartitial } from '../types';

export const restApiCorsConfig: AWSPartitial = {
  resources: {
    Resources: {
      ApiGateway4XXResponse: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: Ref('ApiGatewayRestApi'),
          StatusCode: '401',
        },
      },
      ApiGateway5XXResponse: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'DEFAULT_5XX',
          RestApiId: Ref('ApiGatewayRestApi'),
          StatusCode: '500',
        },
      },
    },
  },
};
