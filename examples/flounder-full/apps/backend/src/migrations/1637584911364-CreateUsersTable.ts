import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1637584911364 implements MigrationInterface {
  name = 'CreateUsersTable1637584911364';
  private readonly UsersTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'int4',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'email',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.UsersTable);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable(this.UsersTable);
  }
}
