import { Join, Ref } from '../../config/serverless/cf-intristic-fn';
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
          {
            Effect: 'Allow',
            Action: ['ssm:GetParameters', 'ssm:PutParameter'],
            Resource: [
              Join(':', [
                'arn:aws:ssm',
                Ref('AWS::Region'),
                Ref('AWS::AccountId'),
                'parameter/${file(./env.yml):${self:provider.stage}.CLIENT}/${self:service}/${self:provider.stage}/*',
              ]),
            ],
          },
        ],
      },
    },
  },
  functions: {
    apiUpdateEnvironmentInitialization: {
      handler: 'management/api/handler.apiUpdateEnvironmentInitialization',
      memorySize: 128,
      timeout: 28,
      events: [
        {
          http: {
            path: 'api/management/environment/initialization',
            method: 'get',
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
    apiUpdateEnvironment: {
      handler: 'management/api/handler.apiUpdateEnvironment',
      environment: {
        CLOUD_FORMATION_STACK: Ref('AWS::StackName'),
      },
      memorySize: 128,
      timeout: 28,
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
    updateEnvironmentFromSSM: {
      handler: 'management/api/handler.updateEnvironmentFromSSM',
      memorySize: 128,
      timeout: 28,
      environment: {
        CLOUD_FORMATION_STACK: Ref('AWS::StackName'),
      },
    },
    decryptEnvironment: {
      handler: 'management/api/handler.decryptEnvironment',
      environment: {
        CLOUD_FORMATION_STACK: Ref('AWS::StackName'),
      },
      memorySize: 128,
      timeout: 28,
    },
  },
};
