import { log } from '@helper/logger';

import * as nodemailer from 'nodemailer';

export interface MailOptions {
  to: string;
  from: string;
  html: string;
  subject: string;
}

export async function sendMail(mailOptions: MailOptions): Promise<Record<string, unknown>> {
  log(`Sending email to ${mailOptions.to}`);
  const smtpTransporter =
    process.env.SMTP_OUTLOOK !== 'true'
      ? nodemailer.createTransport({
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          host: process.env.SMTP_HOST,
          port: +process.env.SMTP_PORT!,
          secure: process.env.SMTP_TLS === 'true',
        })
      : nodemailer.createTransport({
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          host: process.env.SMTP_HOST,
          port: +process.env.SMTP_PORT!,
          secureConnection: false,
          requireTLS: true,
          tls: {
            ciphers: 'SSLv3',
          },
        });
  return smtpTransporter.sendMail(mailOptions);
}
