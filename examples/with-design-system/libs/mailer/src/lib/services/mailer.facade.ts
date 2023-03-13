import { Injectable } from '@nestjs/common';
import { IEmailObject } from '../interfaces';
import { NestMailerAdapter } from './adapters/nest-mailer.adapter';

@Injectable()
export class MailerFacade {
  constructor(private readonly mailAdapter: NestMailerAdapter) {}

  async sendEmail(message: IEmailObject): Promise<void> {
    return this.mailAdapter.sendEmail(message);
  }
}
