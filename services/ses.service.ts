import { SES } from 'aws-sdk';
import { SendEmailResponse } from 'aws-sdk/clients/ses';

export class SESService {
  private ses: SES;

  constructor() {
    this.ses = new SES();
  }

  public sendEmail(emails: string[], body: string, subject: string, source: string): Promise<SendEmailResponse> {
    const params = {
      Destination: {
        ToAddresses: [...emails],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: source,
    };

    return this.ses.sendEmail(params).promise();
  }
}
