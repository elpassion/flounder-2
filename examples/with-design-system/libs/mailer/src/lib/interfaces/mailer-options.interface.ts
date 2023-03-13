import { ModuleMetadata } from '@nestjs/common';
import { EmailProvider } from '../enums';

export interface IMailerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<IMailerModuleOptions> | IMailerModuleOptions;
  inject?: any[];
}

export interface IMailerModuleOptions {
  sesRegion?: string;
  emailPort?: number;
  emailProvider: EmailProvider;
  transactionalEmailSender: string;
}
