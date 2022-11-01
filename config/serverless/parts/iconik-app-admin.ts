import { Join, Ref } from '../cf-intristic-fn';
import { AWSPartitial } from '../types';

export const iconikAppAdminConfig: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['kms:Decrypt'],
            Resource: [Join(':', ['arn:aws:kms', Ref('AWS::Region'), Ref('AWS::AccountId'), 'alias/aws/ssm'])],
          },
          {
            Effect: 'Allow',
            Action: ['ssm:GetParameters', 'ssm:PutParameter', 'ssm:GetParametersByPath'],
            Resource: [
              Join(':', [
                'arn:aws:ssm',
                Ref('AWS::Region'),
                Ref('AWS::AccountId'),
                'parameter/win/${param:CLIENT}/${self:service}/${self:provider.stage}/*',
              ]),
            ],
          },
        ],
      },
    },
  },
  functions: {
    iaaInit: {
      handler: 'api/iconik-app-admin/handler.init',
      memorySize: 128,
      timeout: 28,
      events: [
        {
          httpApi: {
            path: '/api/iconik-app-admin/init',
            method: 'post',
          },
        },
      ],
    },
    iaaUpdateAppToken: {
      handler: 'api/iconik-app-admin/handler.updateAppToken',
      memorySize: 128,
      timeout: 28,
      events: [
        {
          httpApi: {
            path: '/api/iconik-app-admin/update-app-token',
            method: 'post',
          },
        },
      ],
    },
  },
};
