import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IMailerModuleOptions } from './interfaces';

interface IExtraOptions {
  isGlobal?: boolean;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<IMailerModuleOptions>()
    .setExtras<IExtraOptions>(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      })
    )
    .setClassMethodName('forRoot')
    .build();
