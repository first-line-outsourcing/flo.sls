// import { GetAtt, Join, Ref } from '../cf-intristic-fn';
// import { AWSPartitial } from '../types';
//
// export const queueExampleConfig: AWSPartitial = {
//   provider: {
//     iam: {
//       role: {
//         statements: [
//           {
//             Effect: 'Allow',
//             Action: ['sqs:DeleteMessage', 'sqs:ReceiveMessage', 'sqs:SendMessage', 'sqs:ChangeMessageVisibility'],
//             Resource: [GetAtt('SubscribeQueue.Arn')],
//           },
//         ],
//       },
//     },
//   },
//   functions: {
//     // prefix "trigger" for S3, SQS, SNS, EventBridge, etc, Lambda triggers
//     triggerSQSExample: {
//       handler: 'api/feature/handler.feature',
//       description: 'Example of Lambda function with SQS trigger',
//       timeout: 28,
//       events: [
//         {
//           sqs: {
//             arn: GetAtt('SubscribeQueue.Arn'),
//             batchSize: 1,
//           },
//         }
//       ],
//     },
//   },
//   resources: {
//     Resources: {
//       SubscribeQueue: {
//         Type: 'AWS::SQS::Queue',
//         Properties: {
//           QueueName: '${self:custom.queuesNames.SubscribeQueue.${self:provider.stage}}',
//           MessageRetentionPeriod: 1209600,
//           VisibilityTimeout: 30,
//           FifoQueue: true,
//           DelaySeconds: 5,
//           ContentBasedDeduplication: true,
//           RedrivePolicy: {
//             deadLetterTargetArn: GetAtt('DeadLetterQueue.Arn'),
//             maxReceiveCount: 50,
//           },
//         },
//       },
//       DeadLetterQueue: {
//         Type: 'AWS::SQS::Queue',
//         Properties: {
//           FifoQueue: true,
//           MessageRetentionPeriod: 1209600,
//         },
//       },
//       QueueDepthAlarmOver1000: {
//         Type: 'AWS::CloudWatch::Alarm',
//         Properties: {
//           AlarmDescription: 'Alarm if queue depth grows beyond 1000 messages',
//           Namespace: 'AWS/SQS',
//           MetricName: 'NumberOfMessagesVisible',
//           Dimensions: [
//             {
//               Name: 'QueueName',
//               Value: '${self:custom.queuesNames.SubscribeQueue.${self:provider.stage}}',
//             },
//           ],
//           Statistic: 'Sum',
//           Period: 60,
//           EvaluationPeriods: 1,
//           Threshold: 1000,
//           ComparisonOperator: 'GreaterThanOrEqualToThreshold',
//           AlarmActions: [
//             Join('', [
//               'arn:aws:sns:${self:provider.region}:',
//               Ref('AWS::AccountId'),
//               ':${self:provider.environment.SNS}',
//             ]),
//           ],
//         },
//       },
//     },
//   },
//   custom: {
//     queuesUrls: {
//       SubscribeQueue: {
//         local: '',
//         dev: Ref('SubscribeQueue'),
//         test: Ref('SubscribeQueue'),
//         prod: Ref('SubscribeQueue'),
//       },
//     },
//     queuesNames: {
//       SubscribeQueue: {
//         local: 'flo-local-subscribe',
//         dev: 'flo-dev-subscribe',
//         test: 'flo-test-subscribe',
//         prod: 'flo-prod-subscribe',
//       },
//     },
//   },
// };
