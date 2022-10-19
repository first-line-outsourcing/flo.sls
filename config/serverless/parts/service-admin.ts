import { Join, Ref } from '../cf-intristic-fn';
import { AWSPartitial } from '../types';

export const serviceAdminConfig: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          {
            'Effect': 'Allow',
            'Action': [
              'kms:Decrypt'
            ],
            'Resource': [
              Join(':', [
                'arn:aws:kms',
                Ref('AWS::Region'),
                Ref('AWS::AccountId'),
                'alias/aws/ssm',
              ])
            ]
          },
          {
            Effect: 'Allow',
            Action: ['ssm:GetParameters', 'ssm:PutParameter', 'ssm:GetParametersByPath'],
            Resource: [
              Join(':', [
                'arn:aws:ssm',
                Ref('AWS::Region'),
                Ref('AWS::AccountId'),
                'parameter/win/${file(./env.yml):${self:provider.stage}.CLIENT}/${self:service}/${self:provider.stage}/*',
              ]),
            ],
          },
        ],
      },
    },
  },
  functions: {
    sadminInit: {
      handler: 'api/service-admin/handler.init',
      memorySize: 128,
      timeout: 28,
      events: [
        {
          httpApi: {
            path: '/api/service-admin/init',
            method: 'post',
          },
        },
      ],
    },
    sadmiUpdateIconikCredentials: {
      handler: 'api/service-admin/handler.updateIconikCredentials',
      memorySize: 128,
      timeout: 28,
      events: [
        {
          httpApi: {
            path: '/api/service-admin/update-iconik-credentials',
            method: 'post',
          },
        },
      ],
    },
  },
};
