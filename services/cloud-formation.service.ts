// import { CloudFormation } from 'aws-sdk';
// import { DescribeStacksOutput, Output } from 'aws-sdk/clients/cloudformation';
//
// import { arrayToObject } from '@helper/helper';
// import { log } from '@helper/logger';
//
// export interface OutputsMap {
//   [key: string]: Output;
// }
//
// export class CloudFormationService {
//   private cloudFormation: CloudFormation = new CloudFormation();
//
//   public async getOutputs(keys: string[] = [], cloudFormationName: string = process.env.CLOUDFORMATION_NAME): Promise<OutputsMap> {
//     const params = {
//       StackName: cloudFormationName,
//     };
//
//     return this.cloudFormation.describeStacks(params)
//       .promise()
//       .then((stack: DescribeStacksOutput) => stack && stack.Stacks && stack.Stacks[0].Outputs)
//       .then((outputs) => {
//         log('Stack outputs', cloudFormationName, outputs);
//         if (!outputs || !outputs.length) {
//           return {};
//         }
//         if (!keys.length) {
//           return arrayToObject(outputs, 'OutputKey');
//         }
//         return arrayToObject(outputs.filter((output: Output) => keys.includes(output.OutputKey as string)), 'OutputKey');
//       });
//   }
// }
