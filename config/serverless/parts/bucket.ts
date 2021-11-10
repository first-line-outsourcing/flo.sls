// import { AWSPartitial } from '../types';
//
// export const bucketExampleConfig: AWSPartitial = {
//   provider: {
//     iam: {
//       role: {
//         statements: [
//           {
//             Effect: 'Allow',
//             Action: ['s3:*'],
//             Resource: [
//               'arn:aws:s3:::${file(env.yml):${self:provider.stage}.BUCKET}',
//               'arn:aws:s3:::${file(env.yml):${self:provider.stage}.BUCKET}/*',
//             ],
//           },
//         ],
//       },
//     },
//   },
//   functions: {
//     // prefix "trigger" for S3, SQS, SNS, EventBridge, etc, Lambda triggers
//     triggerS3Example: {
//       handler: 'api/feature/handler.feature',
//       description: 'Example of Lambda function with S3 trigger',
//       timeout: 28,
//       events: [
//         {
//           s3: {
//             bucket: '${file(env.yml):${self:provider.stage}.BUCKET}',
//             event: 's3:ObjectCreated:*',
//           },
//         },
//       ],
//     },
//   },
//   resources: {
//     Resources: {
//       MyBucket: {
//         Type: 'AWS::S3::Bucket',
//         Properties: {
//           BucketName: '${file(env.yml):${self:provider.stage}.BUCKET}',
//         },
//       },
//     },
//   },
// };
