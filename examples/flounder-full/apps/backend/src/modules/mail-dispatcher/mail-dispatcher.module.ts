import { Module } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ConfigService } from '@nestjs/config';

import { EmailProvider, MailerModule } from '@flounder/mailer';

import { MailDispatcherFacade } from './services/mail-dispatcher.facade';
import { ConfigValidator } from '../../shared/common/configuration/config.validator.ts';

class MailerConfigEnvVariables {
  @IsNotEmpty()
  @IsString()
  @Expose()
  SES_REGION!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  TRANSACTIONAL_EMAIL_SENDER!: string;
}

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { SES_REGION, TRANSACTIONAL_EMAIL_SENDER } = ConfigValidator.validate(
          MailerConfigEnvVariables,
          {
            SES_REGION: configService.get('SES_REGION'),
            TRANSACTIONAL_EMAIL_SENDER: configService.get('TRANSACTIONAL_EMAIL_SENDER'),
          },
        );
        return {
          sesRegion: SES_REGION,
          emailProvider: EmailProvider.AWS_SES,
          transactionalEmailSender: TRANSACTIONAL_EMAIL_SENDER,
        };
      },
    }),
  ],
  providers: [MailDispatcherFacade],
  exports: [MailDispatcherFacade],
})
export class MailDispatcherModule {}
