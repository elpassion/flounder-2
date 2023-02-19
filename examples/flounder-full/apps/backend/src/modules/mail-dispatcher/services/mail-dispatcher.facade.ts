import { Injectable } from '@nestjs/common';
import { Template } from '../enums/template.enum';
import { MailExampleDto } from '@flounder/contracts';
import { EmailSubscriptionJob } from '../../email-sending-processor/consumers/email-subscriptions.consumer';
import { MailerFacade } from '@flounder/mailer';

@Injectable()
export class MailDispatcherFacade {
  constructor(private readonly mailerFacade: MailerFacade) {}

  async sendNewsletter(email: EmailSubscriptionJob, textLocal: string): Promise<void> {
    return this.mailerFacade.sendEmail({
      text: textLocal,
      to: [email.to],
      subject: email.subject,
      template: Template.NEWSLETTER,
      context: {
        text: email.text,
      },
    });
  }

  async sendUserBlockedEmail(emailAddress: string): Promise<void> {
    return this.mailerFacade.sendEmail({
      to: [emailAddress],
      subject: 'You are blocked',
      template: Template.BLOCKED,
      context: {
        title: 'You are blocked',
        body: `The user with email ${emailAddress} is blocked. Contact the administrator for further assistance.`,
      },
    });
  }

  async sendEmail(payload: MailExampleDto): Promise<void> {
    await this.mailerFacade.sendEmail({
      to: [payload.to],
      template: Template.EXAMPLE,
      subject: payload.subject,
      context: {
        title: payload.subject,
        body: payload.text,
      },
    });
  }
}
