import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} from './pagination.module-definition';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PaginationFacade } from './pagination.interfaces';
import { TypeORMAdapter } from './TypeORM/typeorm.adapter';

export enum ORMProvider {
  TYPEORM = 'TYPEORM',
}

@Module({
  exports: [PaginationFacade],
})
export class PaginationModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const providers = getModuleProviders(options);
    return {
      ...super.register(options),
      providers,
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    if (!options.useFactory) {
      throw new Error('No factory provided');
    }

    const providers = getModuleProviders(
      options.useFactory() as typeof OPTIONS_TYPE
    );
    return {
      ...super.registerAsync(options),
      providers,
    };
  }
}

function getModuleProviders(options: typeof OPTIONS_TYPE): Provider[] {
  let adapter: Provider;
  switch (options.provider) {
    case ORMProvider.TYPEORM:
      adapter = { provide: PaginationFacade, useExisting: TypeORMAdapter };
      break;
    default:
      throw new Error('Wrong provider specified');
  }

  return [TypeORMAdapter, adapter];
}
