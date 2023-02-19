import { ConfigurableModuleBuilder } from '@nestjs/common';
import { StorageModuleOptions } from './storage.interfaces';

interface IExtraOptions {
  isGlobal?: boolean;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<StorageModuleOptions>()
    .setExtras<IExtraOptions>(
      {
        isGlobal: false
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal
      })
    )
    .setFactoryMethodName('createStorageModuleOptions')
    .build();
