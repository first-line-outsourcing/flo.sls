import { Ref, Sub } from '../cf-intristic-fn';
import { AWSPartitial } from '../types';

export const getMediaInfoConfig: AWSPartitial = {
  functions: {
    // prefix "api" for API Gateway Lambda triggers
    apiGetMediaInfo: {
      handler: 'api/media-info/handler.getMediaInfo',
      description: 'Return Media Info by video URL',
      timeout: 28,
      events: [
        {
          httpApi: {
            path: '/api/media-info',
            method: 'post',
          },
        },
        // {
        //   sns: '${file(env.yml):${self:provider.stage}.SNS}',
        // },
        // {
        //   stream: {
        //     type: 'dynamodb',
        //     arn: GetAtt('UsersTable.StreamArn'),
        //   },
        // },
      ],
    },
  },
  custom: {
    customActionsURLs: {
      GetMediaInfo: {
        local: '${file(env.yml):local.OFFLINE_API_BASE_URL}api/media-info',
        dev: Sub('https://${gatewayId}.execute-api.${region}.${suffix}/${self:provider.stage}/${path}', {
          gatewayId: Ref('ApiGatewayRestApi'),
          region: Ref('AWS::Region'),
          suffix: Ref('AWS::URLSuffix'),
          path: 'api/media-info',
        }),
        test: Sub('https://${gatewayId}.execute-api.${region}.${suffix}/${self:provider.stage}/${path}', {
          gatewayId: Ref('ApiGatewayRestApi'),
          region: Ref('AWS::Region'),
          suffix: Ref('AWS::URLSuffix'),
          path: 'api/media-info',
        }),
        prod: Sub('https://${gatewayId}.execute-api.${region}.${suffix}/${self:provider.stage}/${path}', {
          gatewayId: Ref('ApiGatewayRestApi'),
          region: Ref('AWS::Region'),
          suffix: Ref('AWS::URLSuffix'),
          path: 'api/media-info',
        }),
      },
    },
  },
};
