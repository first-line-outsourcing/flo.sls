// import { PaymentResponse, RefundResource } from 'paypal-rest-sdk';
// import * as paypal from 'paypal-rest-sdk';
//
// import { Job } from '@models/DynamoDB/job.model';
//
// export class PaypalService {
//   constructor() {
//     paypal.configure({
//       mode: process.env.PAYPAL_MODE,
//       client_id: process.env.PAYPAL_CLIENT_ID,
//       client_secret: process.env.PAYPAL_CLIENT_SECRET
//     });
//   }
//
//   public payout(job: Job): Promise<any> {
//     const createPayoutData = {
//       sender_batch_header: {
//         email_subject: `Payment from CRW for job with ${job.producer.companyName}`
//       },
//       items: [
//         {
//           recipient_type: 'EMAIL',
//           amount: {
//             value: (job.flatPrice * 0.92).toFixed(2),
//             currency: 'USD'
//           },
//           receiver: job.crew.paypal,
//           note: `Dates ${job.startDate} - ${job.endDate}.\n` +
//             `Flat Price: $${job.flatPrice}.\n` +
//             `Producer: ${job.producer.companyName}.\n` +
//             `Production Assistant: ${job.crew.lastName} ${job.crew.firstName}.\n` +
//             `Call Time: ${job.callTime}. Duration: ${job.duration}.\n` +
//             `Location: ${job.location}.\n` +
//             `Requirements: ${job.requirements}.\n` +
//             `${job.optional ? `Optional: ${job.optional}` : ''}`,
//           sender_item_id: 'item_1'
//         }
//       ]
//     };
//
//     return new Promise((resolve, reject) => {
//       paypal.payout.create(createPayoutData, false, (error, payout) => {
//         if (error) {
//           reject(error.response);
//         }
//         resolve(payout);
//       });
//     })
//   }
//
//   public getPayout(id: string): Promise<any> {
//     return new Promise((resolve, reject) => {
//       paypal.payout.get(id, {}, (error, payout) => {
//         if (error) {
//           reject(error.response);
//         }
//         resolve(payout);
//       })
//     })
//   }
//
//   public getPayment(id: string): Promise<PaymentResponse> {
//     return new Promise((resolve, reject) => {
//       paypal.payment.get(id, {}, (error, payout) => {
//         if (error) {
//           reject(error.response);
//         }
//         resolve(payout);
//       })
//     })
//   }
//
//   public refund(saleId: string, amount: string): Promise<RefundResource> {
//     const refundData = {
//       amount: {
//         total: amount,
//         currency: 'USD'
//       }
//     };
//
//     return new Promise((resolve, reject) => {
//       paypal.sale.refund(saleId, refundData, {}, (error, payout) => {
//         if (error) {
//           reject(error.response);
//         }
//         resolve(payout);
//       });
//     })
//   }
// }
