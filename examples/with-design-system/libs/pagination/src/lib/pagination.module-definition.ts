import { PaginationModuleOptions } from './pagination.interfaces';
import { ConfigurableModuleBuilder } from '@nestjs/common';

interface IExtraOptions {
  isGlobal?: boolean;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PaginationModuleOptions>()
  .setExtras<IExtraOptions>(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    })
  )
  .build();
