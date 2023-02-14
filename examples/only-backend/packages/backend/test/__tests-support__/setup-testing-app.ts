import { instance } from "ts-mockito";
import { INestApplication } from "@nestjs/common";
import { Type } from "@nestjs/common/interfaces/type.interface";
import { DynamicModule } from "@nestjs/common/interfaces/modules/dynamic-module.interface";
import { ForwardReference } from "@nestjs/common/interfaces/modules/forward-reference.interface";
import { TestingModuleBuilder } from "@nestjs/testing/testing-module.builder";

import { Maybe } from "../../../functional/maybe";
import { isNil, isNotNil } from "../../../functional/logic";
import { createTestingModule } from "./testing.module";

type Module = Type | DynamicModule | Promise<DynamicModule> | ForwardReference;

type ProviderMock<T> = {
  provider: new (...args: any[]) => T,
  mock: T,
  resetMock: () => void
};

export class TestingAppRunner {
  private app: Maybe<INestApplication>;
  private readonly modules: Module[];
  private providerMocks: ProviderMock<any>[] = [];

  constructor(importedModules: Module[] = []) {
    this.app = null;
    this.modules = importedModules;
  }

  async start(): Promise<void> {
    if (isNotNil(this.app)) return;

    let moduleBuilder: TestingModuleBuilder = await createTestingModule(
      { imports: this.modules }
    );

    this.providerMocks.forEach((providerMock) => {
      moduleBuilder = moduleBuilder
          .overrideProvider(providerMock.provider)
          .useValue(instance(providerMock.mock))
    });
    const testingModule = await moduleBuilder.compile();

    this.app = testingModule.createNestApplication();

    await this.app.init();

    this.resetAllMocks();
  };

  mockProvider<T>(mock: ProviderMock<T>): void {
    if (isNotNil(this.app)) throw new Error(
      "App already started! You need to mock providers before you start the testing app."
    );

    this.providerMocks.push(mock);
  }

  getMockedProvider<T extends object>(provider: new (...args: any[]) => T): T {
    const providerMock = this.providerMocks.find(
      (providerMock) =>
        providerMock.provider.name === provider.name
    );

    if (isNil(providerMock)) {
      throw new Error(`Provider not mocked: ${provider.name}`);
    }
    return providerMock.mock;
  }

  async stop (): Promise<void> {
    if (isNil(this.app)) throw new Error("Testing app is not started.");

    await this.app.close();

    this.app = null;
  };

  getApp(): INestApplication {
    if (isNil(this.app)) throw new Error("Testing app is not started.");

    return this.app;
  }

  resetAllMocks(): void {
    if (isNil(this.app)) throw new Error("Testing app is not started.");

    this.providerMocks.forEach((providerMock) => providerMock.resetMock());
  }
}
