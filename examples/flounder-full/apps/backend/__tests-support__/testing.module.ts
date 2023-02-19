import { Test } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { TestingModuleBuilder } from '@nestjs/testing/testing-module.builder';
import { JwtStrategy } from '../src/auth/strategies/jwt.strategy';
import { JwtStrategyMock } from '../src/auth/strategies/jwt.strategy.mock';
import { DatabaseCleaner } from './database.cleaner';
import { mock } from 'ts-mockito';
import { Logger } from 'nestjs-pino';

export const createTestingModule: typeof Test.createTestingModule = (
  metadata: ModuleMetadata,
): TestingModuleBuilder => {
  return Test.createTestingModule({
    ...metadata,
    providers: [...(metadata.providers || []), DatabaseCleaner],
  })
    .overrideProvider(JwtStrategy)
    .useClass(JwtStrategyMock)
    .overrideProvider(Logger)
    .useValue(mock(Logger));
};
