import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IEmailObject, IMailerModuleOptions } from '../../interfaces';
import { MAILER_MODULE_OPTIONS } from '../../mailer.constants';

@Injectable()
export class NestMailerAdapter {
  constructor(
    @Inject(MAILER_MODULE_OPTIONS)
    private config: IMailerModuleOptions,
    private readonly nestMailerService: MailerService
  ) {}

  async sendEmail(message: IEmailObject): Promise<void> {
    await this.nestMailerService.sendMail({
      from: message.from ?? this.config.transactionalEmailSender,
      ...message,
    });
  }
}
