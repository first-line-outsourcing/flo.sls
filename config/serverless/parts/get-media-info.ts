import { Ref, Sub } from '../cf-intristic-fn';
import { AWSPartitial } from '../types';

export const getMediaInfoConfig: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          // {
          //   Effect: 'Allow',
          //   Action: ['s3:*'],
          //   Resource: [
          //     'arn:aws:s3:::${file(env.yml):${self:provider.stage}.BUCKET}',
          //     'arn:aws:s3:::${file(env.yml):${self:provider.stage}.BUCKET}/*',
          //   ],
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['sqs:DeleteMessage', 'sqs:ReceiveMessage', 'sqs:SendMessage'],
          //   Resource: [GetAtt('SubscribeQueue.Arn')],
          // },
        ],
      },
    },
  },
  functions: {
    getMediaInfo: {
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
        //   schedule: 'cron(1 10 * * ? *)', // in Hawaii Standard Time will be 12:01am, in Eastern Daylight Time will be 06:01am
        // },
        // {
        //   schedule: 'rate(3 minutes)',
        // },
        // {
        //   sqs: {
        //     arn: GetAtt('SubscribeQueue.Arn'),
        //     batchSize: 1,
        //   },
        // },
        // {
        //   sns: '${file(env.yml):${self:provider.stage}.SNS}',
        // },
        // {
        //   s3: {
        //     bucket: '${file(env.yml):${self:provider.stage}.BUCKET}',
        //     event: 's3:ObjectCreated:*',
        //   },
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
  resources: {
    Resources: {
      // MyBucket: {
      //   Type: 'AWS::S3::Bucket',
      //   Properties: {
      //     BucketName: '${file(env.yml):${self:provider.stage}.BUCKET}',
      //     AccessControl: 'PublicReadWrite',
      //   },
      // },
      // SubscribeQueue: {
      //   Type: 'AWS::SQS::Queue',
      //   Properties: {
      //     QueueName: '${self:custom.queuesNames.SubscribeQueue.${self:provider.stage}}',
      //     MessageRetentionPeriod: 1209600,
      //     VisibilityTimeout: 30,
      //     FifoQueue: true,
      //     DelaySeconds: 5,
      //     ContentBasedDeduplication: true,
      //     RedrivePolicy: {
      //       deadLetterTargetArn: GetAtt('DeadLetterQueue.Arn'),
      //       maxReceiveCount: 50,
      //     },
      //   },
      // },
      // DeadLetterQueue: {
      //   Type: 'AWS::SQS::Queue',
      //   Properties: {
      //     FifoQueue: true,
      //     MessageRetentionPeriod: 1209600,
      //   },
      // },
      // QueueDepthAlarmOver1000: {
      //   Type: 'AWS::CloudWatch::Alarm',
      //   Properties: {
      //     AlarmDescription: 'Alarm if queue depth grows beyond 1000 messages',
      //     Namespace: 'AWS/SQS',
      //     MetricName: 'NumberOfMessagesVisible',
      //     Dimensions: [
      //       {
      //         Name: 'QueueName',
      //         Value: '${self:custom.queuesNames.SubscribeQueue.${self:provider.stage}}',
      //       },
      //     ],
      //     Statistic: 'Sum',
      //     Period: 60,
      //     EvaluationPeriods: 1,
      //     Threshold: 1000,
      //     ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      //     AlarmActions: [
      //       Join('', [
      //         'arn:aws:sns:${self:provider.region}:',
      //         Ref('AWS::AccountId'),
      //         ':${self:provider.environment.SNS}',
      //       ]),
      //     ],
      //   },
      // },
    },
  },
  custom: {
    // queuesUrls: {
    //   SubscribeQueue: {
    //     local: '',
    //     dev: Ref('SubscribeQueue'),
    //     test: Ref('SubscribeQueue'),
    //     prod: Ref('SubscribeQueue'),
    //   },
    // },
    // queuesNames: {
    //   SubscribeQueue: {
    //     local: 'flo-local-subscribe',
    //     dev: 'flo-dev-subscribe',
    //     test: 'flo-test-subscribe',
    //     prod: 'flo-prod-subscribe',
    //   },
    // },
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
