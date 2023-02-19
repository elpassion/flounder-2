import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { FeatureFlagsModule } from '../feature-flags/feature-flags.module';
import { MailDispatcherModule } from '../mail-dispatcher/mail-dispatcher.module';
import { EmailController } from './send-email.controller';

@Module({
  imports: [AuthModule, FeatureFlagsModule, MailDispatcherModule],
  providers: [],
  controllers: [EmailController],
})
export class SendEmailModule {}
