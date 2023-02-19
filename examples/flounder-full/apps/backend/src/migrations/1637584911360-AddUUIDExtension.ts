import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUUIDExtension1637584911360 implements MigrationInterface {
  name = 'AddUUIDExtension1637584911360';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query('DROP EXTENSION IF NOT EXISTS "uuid-ossp";');
  }
}
