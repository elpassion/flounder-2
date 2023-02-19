import { Test } from 'supertest';
import { TestingAppRunner } from '../setup-testing-app';
import { INestApplication } from '@nestjs/common';
import { Role } from '../../src/auth/casl/enums/role.enum';
import { withToken } from '../decorators/auth.decorator';
import {
  createUserFixture,
  defaultUser,
} from '../../src/domain/users/__tests-support__/user-fixture';
import { Paginated } from "@flounder/pagination";

export class PaginationScenario {
  private scenarios: (() => void | Promise<void>)[];
  private response!: Paginated<any>;

  constructor(
    private appRunner: TestingAppRunner,
    private makeRequest: (app: INestApplication) => Test,
    private grantedRoleLevel: Role,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onBeforeAll: (appRunner: TestingAppRunner) => Promise<void> = async () => {},
  ) {
    this.scenarios = [];
  }

  public itShouldReturnRequiredShape() {
    this.scenarios.push(
      () => expect(this.response).toMatchObject(
          {
            data: expect.toBeArray(),
            meta: {
              itemsPerPage: expect.any(Number),
              totalItems: expect.any(Number),
              currentPage: expect.any(Number),
              totalPages: expect.any(Number),
            },
            links: expect.anything()
          }
        )
    );
    return this;
  }

  public itShouldReturnTotalCount(totalItems: number) {
    this.scenarios.push(
      () => expect(this.response.meta.totalItems).toEqual(totalItems)
    );
    return this;
  }

  public itShouldReturnMaxItemsPerPage(itemsPerPage: number) {
    this.scenarios.push(
      () => {
        expect(this.response.meta.itemsPerPage).toEqual(itemsPerPage);
        expect(this.response.data.length <= itemsPerPage).toBeTrue();
      }
    );
    return this;
  }

  public itShouldReturnTotalPages(totalPages: number) {
    this.scenarios.push(
      () => expect(this.response.meta.totalPages).toEqual(totalPages)
    );
    return this;
  }

  public itShouldEqual(body: any) {
    this.scenarios.push(
      () => expect(this.response.data).toEqual(body)
    );
    return this;
  }

  async run() {
    describe('pagination', () => {
      beforeAll(async () => {
        await this.onBeforeAll(this.appRunner);

        const user = await createUserFixture()
          .withCognitoId(defaultUser.cognito_id)
          .withEmail('dummy@email.com')
          .createAndSaveInDB(this.appRunner.getApp());

        this.response = (
          await withToken(this.makeRequest, builder =>
            builder.withId(user.cognito_id).withEmail(user.email).withGroup(this.grantedRoleLevel),
          )(this.appRunner.getApp())
        ).body;
      });

      it('should pass test cases', async () => {
        for (const scenario of this.scenarios) {
          scenario();
        }
      })
    });
  }
}

export const createPaginationScenario = (
  appRunner: TestingAppRunner,
  makeRequest: (app: INestApplication) => Test,
  grantedRoleLevel: Role,
  onBeforeAll?: (appRunner: TestingAppRunner) => Promise<void>
) => new PaginationScenario(appRunner, makeRequest, grantedRoleLevel, onBeforeAll);
