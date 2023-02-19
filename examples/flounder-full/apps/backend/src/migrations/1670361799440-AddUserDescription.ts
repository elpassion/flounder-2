import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserDescription1670361799559 implements MigrationInterface {
  name = 'AddUserDescription1670361799559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
  }
}
