// import { AWSPartitial } from '../types';
//
// export const scheduleExampleConfig: AWSPartitial = {
//   functions: {
//     // prefix "schedule" for CRON Lambda triggers
//     scheduleExample: {
//       handler: 'api/feature/handler.feature',
//       description: 'Example of Lambda function with schedule trigger',
//       timeout: 28,
//       events: [
//         {
//           schedule: 'cron(1 10 * * ? *)', // in Hawaii Standard Time will be 12:01am, in Eastern Daylight Time will be 06:01am
//         },
//         {
//           schedule: 'rate(3 minutes)',
//         },
//       ],
//     },
//   },
// };
