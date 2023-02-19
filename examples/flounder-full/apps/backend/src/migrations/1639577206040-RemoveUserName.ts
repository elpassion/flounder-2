import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserName1639577206040 implements MigrationInterface {
  name = 'RemoveUserName1639577206040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
            ADD "name" character varying`);
  }
}
