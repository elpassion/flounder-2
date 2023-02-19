import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmailsSubscriptionsTable1641542705611 implements MigrationInterface {
  name = 'CreateEmailsSubscriptionsTable1641542705611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "email_subscriptions" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8e8eebc384627fb6fa7fd3993fd" UNIQUE ("email"), CONSTRAINT "PK_e60e3a09d341892b331d0e14e98" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "email_subscriptions"`);
  }
}
