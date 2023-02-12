import { AWSPartitial } from '../types';

export const getMediaInfoConfig: AWSPartitial = {
  params: {
    default: {
      // SNS: ''
    },
  },
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
        //   sns: '${param:SNS}',
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
};
