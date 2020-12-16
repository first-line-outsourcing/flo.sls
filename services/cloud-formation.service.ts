import { arrayToObject } from '@helper/helper';
import { log } from '@helper/logger';
import { CloudFormation } from 'aws-sdk';
import { DescribeStacksInput, DescribeStacksOutput, Output, Outputs } from 'aws-sdk/clients/cloudformation';

export interface OutputsMap {
  [key: string]: Output;
}

export class CloudFormationService {
  private cloudFormation: CloudFormation = new CloudFormation();

  async getOutputs(keys: string[] = [], stackName = process.env.CLOUDFORMATION_STACK_NAME): Promise<OutputsMap> {
    const params: DescribeStacksInput = {
      StackName: stackName,
    };

    const describeStacksOutput: DescribeStacksOutput = await this.cloudFormation.describeStacks(params).promise();
    const describeStack = describeStacksOutput.Stacks?.find((stack) => stack.StackName === stackName);
    if (!describeStack) {
      return {};
    }

    const outputs: Outputs = describeStack.Outputs!;
    log('Stack outputs', stackName, outputs);
    if (!outputs?.length) {
      return {};
    }

    if (!keys.length) {
      return arrayToObject(outputs, 'OutputKey');
    }
    return arrayToObject(
      outputs.filter((output: Output) => keys.includes(output.OutputKey!)),
      'OutputKey'
    );
  }

  async getServiceEndpoint(): Promise<string | undefined> {
    const outputs = await this.getOutputs(['ServiceEndpoint']);
    return outputs.ServiceEndpoint.OutputValue;
  }
}
