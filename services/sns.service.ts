// import { SNS } from 'aws-sdk';
// import {
//   CreateEndpointResponse,
//   CreatePlatformEndpointInput,
//   DeleteEndpointInput,
//   PublishInput,
// } from 'aws-sdk/clients/sns';
//
// export class SNSService {
//   private sns: SNS = new SNS();
//
//   public createPlatformEndpoint(registrationId: string, registrationType: 'FCM' | 'APNS'): Promise<string> {
//     const params: CreatePlatformEndpointInput = {
//       PlatformApplicationArn: registrationType === 'FCM' ?
//       process.env.SNS_ANDROID_APPLICATION_ARN : process.env.SNS_IOS_APPLICATION_ARN,
//       Token: registrationId,
//     };
//     return this.sns.createPlatformEndpoint(params).promise()
//       .then((result: CreateEndpointResponse) => result.EndpointArn);
//   }
//
//   public deleteEndpoint(endpointArn: string): Promise<any> {
//     const params: DeleteEndpointInput = {
//       EndpointArn: endpointArn,
//     };
//     return this.sns.deleteEndpoint(params).promise();
//   }
//
//   public publish(endpointArn: string, registrationType: 'FCM' | 'APNS', message: string) {
//     let messageBody;
//     let messageStructure: string;
//     if (registrationType === 'FCM') {
//       messageBody = JSON.stringify({
//         default: null,
//         GCM: JSON.stringify({
//           data: {
//             message,
//           },
//         }),
//       });
//       messageStructure = 'json';
//     } else {
//       messageBody = message;
//     }
//
//     const params: PublishInput = {
//       Message: messageBody,
//       TargetArn: endpointArn,
//     };
//     if (messageStructure) {
//       params.MessageStructure = messageStructure;
//     }
//     return this.sns.publish(params).promise();
//   }
// }
