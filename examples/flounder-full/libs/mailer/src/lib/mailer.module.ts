import path from 'path';
import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  MailerModule as NestMailerModule,
  MailerOptions as NestMailerOptions,
} from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendRawEmailCommand, SES } from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { NodeEnvironment } from './enums/node-environment.enum';
import { IMailerModuleAsyncOptions } from './interfaces';
import { MAILER_MODULE_OPTIONS } from './mailer.constants';
import { MailerFacade, NestMailerAdapter } from './services';
import { EmailProvider } from './enums';

@Global()
@Module({
  providers: [MailerFacade, NestMailerAdapter],
  exports: [MailerFacade],
  imports: [],
})
export class MailerModule {
  public static forRootAsync(
    options: IMailerModuleAsyncOptions
  ): DynamicModule {
    const providers = [
      {
        provide: MAILER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
    return {
      module: MailerModule,
      imports: [
        NestMailerModule.forRootAsync({
          inject: options.inject || [],
          useFactory: async (...args) => {
            const config = await options.useFactory(...args);
            const templateDir =
              process.env.NODE_ENV === NodeEnvironment.Test
                ? 'apps/backend/src/templates'
                : path.join(__dirname, 'templates');

            const moduleConfig: NestMailerOptions = {};

            if (config.emailProvider === EmailProvider.AWS_SES) {
              moduleConfig.transport = {
                SES: {
                  ses: new SES({
                    region: config.sesRegion,
                    credentialDefaultProvider: defaultProvider,
                  }),
                  aws: { SendRawEmailCommand },
                },
              };
            } else {
              moduleConfig.transport = {
                port: config.emailPort ?? 1025,
              };
            }

            moduleConfig.template = {
              dir: templateDir,
              adapter: new HandlebarsAdapter(),
              options: { strict: true },
            };

            return moduleConfig;
          },
        }),
      ],
      providers,
      exports: providers,
    };
  }
}
