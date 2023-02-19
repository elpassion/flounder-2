import { INestApplication, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseCleaner {
  constructor(private dataSource: DataSource) {}

  public async cleanup() {
    const connection = this.dataSource.manager.connection;

    if (!connection.isInitialized) {
      await connection.initialize();
    }

    const tables = connection.entityMetadatas
      .filter(metadata => metadata.tableType === 'regular')
      .map(metadata => `${metadata.schema}.${metadata.tableName}`);

    return connection.query(`TRUNCATE TABLE ${tables.join(', ')} RESTART IDENTITY CASCADE`);
  }
}

export const clearDatabase = async (app: INestApplication): Promise<void> => {
  const databaseCleaner = app.get(DatabaseCleaner);
  await databaseCleaner.cleanup();
}

export const cleanupDbBeforeEach = (appGetter: () => INestApplication) => {
  beforeEach(async () => {
    await clearDatabase(appGetter());
  });
};

