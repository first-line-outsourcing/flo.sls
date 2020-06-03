import { SQS } from 'aws-sdk';
import { SendMessageResult } from 'aws-sdk/clients/sqs';

export class SQSService {
  private sqs: SQS;

  constructor(private queueUrl: string) {
    this.sqs = new SQS();
  }

  public deleteMessage(receiptHandle: string): Promise<Record<string, unknown>> {
    const params = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    };

    return this.sqs.deleteMessage(params).promise();
  }

  public sendMessage(body: string): Promise<SendMessageResult> {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: body,
    };

    return this.sqs.sendMessage(params).promise();
  }
}
