import { Join, Ref } from '../../config/serverless/cf-intristic-fn';
import { AWSPartitial } from '../../config/serverless/types';
import { updateEnvironmentFromSSM } from '../api/handler';

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
                'parameter/${self:provider.environment.CLIENT}/${self:service}/${self:provider.stage}/*',
              ]),
            ],
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
    apiUpdateEnvironmentFromSSM: {
      handler: 'management/api/handler.updateEnvironmentFromSSM',
      memorySize: 128,
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
    },
  },
};
