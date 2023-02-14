import { Test } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { TestingModuleBuilder } from '@nestjs/testing/testing-module.builder';
import { mock } from 'ts-mockito';
import { Logger } from 'nestjs-pino';

export const createTestingModule: typeof Test.createTestingModule = (
  metadata: ModuleMetadata,
): TestingModuleBuilder => {
  return Test.createTestingModule({
    ...metadata,
    providers: [...(metadata.providers || [])],
  })
    .overrideProvider(Logger)
    .useValue(mock(Logger));
};
