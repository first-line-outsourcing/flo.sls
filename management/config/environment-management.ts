import { Ref } from '../../config/serverless/cf-intristic-fn';
import { AWSPartitial } from '../../config/serverless/types';

export const environmentManagementConfig: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['cloudformation:ListStackResources'],
            Resource: [Ref('AWS::StackId')],
          },
          {
            Effect: 'Allow',
            Action: ['lambda:UpdateFunctionConfiguration', 'lambda:GetFunctionConfiguration'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['kms:decrypt'],
            Resource: '*',
          },
        ],
      },
    },
  },
  functions: {
    apiUpdateEnvironment: {
      handler: 'management/api/handler.apiUpdateEnvironment',
      environment: {
        CLOUD_FORMATION_STACK: Ref('AWS::StackName'),
      },
      memorySize: 128,
      events: [
        {
          http: {
            path: 'api/management/environment',
            method: 'post',
            integration: 'lambda',
            cors: true,
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
    decryptEnvironment: {
      handler: 'management/api/handler.decryptEnvironment',
      environment: {
        CLOUD_FORMATION_STACK: Ref('AWS::StackName'),
      },
      memorySize: 128,
    },
  },
};
