import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDddUserEntity1648815091992 implements MigrationInterface {
  name = 'AddDddUserEntity1648815091992';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ddd_user_entity" (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                hobbies text COLLATE pg_catalog."default" NOT NULL,
                email character varying COLLATE pg_catalog."default" NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1155e16793a93576d7eceec048a" PRIMARY KEY (id)
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS ddd_user_entity`);
  }
}
