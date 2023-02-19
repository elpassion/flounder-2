import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUsernameToUserEntity1639489830064 implements MigrationInterface {
  name = 'addUsernameToUserEntity1639489830064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
            ADD "name" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
