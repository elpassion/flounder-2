import { Command, Console } from 'nestjs-console';
import { DataSource, MigrationExecutor } from 'typeorm';
import { MigrationGenerateCommand } from 'typeorm/commands/MigrationGenerateCommand';
import fs from 'node:fs/promises';
import path from 'path';

type GenerateMigrationOptions = {
  name: string;
  path: string;
};

@Console({
  command: 'migrations',
})
export class MigrationCommand extends MigrationGenerateCommand {
  constructor(private readonly connection: DataSource) {
    super();
  }

  @Command({
    command: 'generate',
    options: [
      {
        flags: '--name <string>',
        description: 'Name of the generated migration',
        required: true,
      },
      {
        flags: '--path <string>',
        description: 'Custom path to migration',
        defaultValue: 'apps/backend/src/migrations/',
        required: true,
      },
    ],
  })
  async generateMigration(options: GenerateMigrationOptions) {
    const migrationPath = `${options.path}${options.name}`;

    const fullPath = migrationPath.startsWith('/')
      ? migrationPath
      : path.resolve(process.cwd(), migrationPath);
    const filename = Date.now() + '-' + path.basename(fullPath) + '.ts';

    try {
      const upSqls: string[] = [];
      const downSqls: string[] = [];

      const sqlInMemory = await this.connection.driver.createSchemaBuilder().log();

      sqlInMemory.upQueries.forEach(upQuery => {
        upSqls.push(
          '        await queryRunner.query(`' +
            upQuery.query.replace(/`/g, '\\`') +
            '`' +
            MigrationGenerateCommand.queryParams(upQuery.parameters) +
            ');',
        );
      });
      sqlInMemory.downQueries.forEach(downQuery => {
        downSqls.push(
          '        await queryRunner.query(`' +
            downQuery.query.replace(/`/g, '\\`') +
            '`' +
            MigrationGenerateCommand.queryParams(downQuery.parameters) +
            ');',
        );
      });

      if (!upSqls.length) {
        console.log(
          `No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command`,
        );

        return;
      } else if (!migrationPath) {
        console.log('Please specify a migration path');

        return
      }

      const fileContent = MigrationGenerateCommand.getTemplate(
        path.basename(fullPath),
        Date.now(),
        upSqls,
        downSqls.reverse(),
      );

      const migrationFileName = path.dirname(fullPath) + '/' + filename;

      await fs.writeFile(migrationFileName, fileContent);
      console.log(`Migration ${migrationFileName} has been generated successfully.`);
    } catch (err) {
      console.error('Error during migration generation:', err);

      return;
    }
  }

  @Command({
    command: 'run',
  })
  async runMigrations() {
    const migrations = await this.connection.runMigrations({ transaction: 'all' });
    console.log('Applied migrations: ');
    console.log(migrations);
    return migrations;
  }

  @Command({
    command: 'revert',
  })
  async revertMigrations() {
    await this.connection.undoLastMigration({ transaction: 'all' });
  }

  @Command({
    command: 'list',
  })
  async listMigrations() {
    const anyPending = await this.connection.showMigrations();
    if (anyPending) {
      const pendingMigrations = await new MigrationExecutor(
        this.connection,
        this.connection.createQueryRunner(),
      ).getPendingMigrations();
      console.log(pendingMigrations);
      throw new Error('Pending migrations');
    }
    console.log('No pending migrations');
  }
}
