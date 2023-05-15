import { createLogger } from '@helper/logger';
import * as nodemailer from 'nodemailer';

const logger = createLogger({
  tags: ['service', 'email'],
});

export interface MailOptions {
  to: string;
  from: string;
  html: string;
  subject: string;
}

export async function sendMail(mailOptions: MailOptions): Promise<Record<string, unknown>> {
  logger.info('sending email', { to: mailOptions.to });
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
