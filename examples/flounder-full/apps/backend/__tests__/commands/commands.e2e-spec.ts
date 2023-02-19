import fs from 'node:fs/promises'
import { DataSource } from 'typeorm';

import { CommandsModule } from '../../src/modules/commands';
import { MigrationCommand } from '../../src/modules/commands/migration.command';
import { TestingAppRunner } from "../../__tests-support__/setup-testing-app";

describe('Commands (e2e)', () => {
  const appRunner = new TestingAppRunner([CommandsModule]);
  let migrationCommand: MigrationCommand;
  let connection: DataSource;

  beforeAll(async () => {
    await appRunner.start();

    migrationCommand = appRunner.getApp().get(MigrationCommand);

    connection = appRunner.getApp().get(DataSource);
    connection.setOptions({
      migrations: ['apps/backend/__tests__/commands/migrations/*.ts'],
      entities: ['apps/backend/__tests__/commands/entities/*.ts'],
    });
    await connection.destroy();
    await connection.initialize();
  }, 10000);

  beforeEach(async () => {
    await deleteMigration();
  });

  afterAll(async () => {
    await deleteMigration();
    await appRunner.stop();
  });


  describe('generate migration', () => {

    it('should generate migration if changes in entity', async () => {
      // When
      await migrationCommand.generateMigration({
        name: 'New-migration',
        path: 'apps/backend/__tests__/commands/migrations/'
      });

      // Given
      const dir = await fs.readdir(`${__dirname}/migrations`);

      // Then
      const [newMigration] = dir.filter(fn => fn.endsWith('New-migration.ts'));
      expect(newMigration).toBeDefined();

      await fs.unlink(`${__dirname}/migrations/${newMigration}`);
    })

    it('should not generate migration if no changes in entity', async () => {
      // When
      await connection.query(`CREATE TABLE "fake-mock" ("id" SERIAL NOT NULL, CONSTRAINT "PK_d3835c3e63c81468519dcf6e621" PRIMARY KEY ("id"))`);

      // Then
      await migrationCommand.generateMigration({
        name: 'New-migration',
        path: 'apps/backend/__tests__/commands/migrations/'
      });

      // Then
      const dir = await fs.readdir(`${__dirname}/migrations`);
      const [newMigration] = dir.filter(fn => fn.endsWith('New-migration.ts'));
      expect(newMigration).not.toBeDefined();

      await connection.query(`DROP TABLE "fake-mock"`);
    })
  })

  describe('list migrations', () => {
    it('should throw error if pending migrations', async () => {
      // When & Then
      await expect(migrationCommand.listMigrations()).rejects.toThrowError();
    });

    it('should resolve if no pending migrations ', async () => {
      // When
      await insertMigration();

      // Then
      await expect(migrationCommand.listMigrations()).resolves.not.toThrowError();
    });
  });

  describe('run migrations', () => {
    it('should return applied migrations if pending', async () => {
      // When & Then
      expect(await migrationCommand.runMigrations()).not.toBeEmpty();
    });

    it('should return empty array if no pending', async () => {
      // When
      await insertMigration();

      // Then
      expect(await migrationCommand.runMigrations()).toBeEmpty();
    });
  });

  describe('revert migrations', () => {
    it('should revert latest migration', async () => {
      // Given
      await insertMigration();
      const result = await selectMigration();

      // When
      await migrationCommand.revertMigrations();

      // Then
      const revertedResult = await selectMigration();
      expect(result).not.toBeEmpty();
      expect(revertedResult).toBeEmpty();
    });
  });

  const selectMigration = () =>
    connection.query(`SELECT * FROM "migrations" WHERE name = 'MockMigration1665644664613'`)
  const deleteMigration = () =>
    connection.query(`DELETE FROM "migrations" WHERE name = 'MockMigration1665644664613'`);
  const insertMigration = () =>
    connection.query(
      `INSERT INTO "migrations" (timestamp, name) VALUES (1665644664613, 'MockMigration1665644664613')`,
    );
});
