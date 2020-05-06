// import { SNSService } from '@services/sns.service';
// import { PushNotification, User, UserModel } from '@models/DynamoDB/User';
// import { log } from '@helper/logger';
//
// export class NotificationService {
//   constructor(private snsService: SNSService) {
//   }
//
//   public async sendNotifications(user: User, message: string) {
//     const invalidEndpoints: string[] = [];
//
//     await Promise.all(
//       user.pushNotifications
//         .map(async (notification: PushNotification) => {
//           log('arn', notification.endpointArn);
//           try {
//             await this.snsService.publish(
//               notification.endpointArn,
//               notification.registrationType,
//               message,
//             );
//           } catch (e) {
//             log('Cannot send notification');
//             console.log(e);
//             invalidEndpoints.push(notification.endpointArn);
//           }
//         }),
//     );
//
//     if (invalidEndpoints.length) {
//       log('with invalid notifications', user);
//       user.pushNotifications = user.pushNotifications.filter((notification: PushNotification) =>
//         !invalidEndpoints.includes(notification.endpointArn));
//       log('without invalid notifications', user);
//       await UserModel.update(user.id, user);
//
//       await Promise.all(
//         invalidEndpoints.map(async (arn: string) => {
//           try {
//             await this.snsService.deleteEndpoint(arn);
//           } catch (e) {
//             log('Cannot delete endpoint');
//             console.log(e);
//           }
//         }),
//       );
//     }
//
//   }
// }
