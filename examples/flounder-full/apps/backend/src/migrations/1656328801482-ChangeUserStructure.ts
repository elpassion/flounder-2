import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeUserStructure1656328801482 implements MigrationInterface {
  name = 'ChangeUserStructure1656328801482';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('users');
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'cognito_id',
        type: 'text',
        isPrimary: true,
      }),
    );
    await queryRunner.dropColumn('users', 'password');
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'first_name',
        type: 'text',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'last_name',
        type: 'text',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar_key',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.changeColumn(
      'users',
      'cognito_id',
      new TableColumn({
        name: 'id',
        type: 'int4',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'password',
        type: 'text',
        isNullable: false,
      }),
    );
    await queryRunner.dropColumn('users', 'first_name');
    await queryRunner.dropColumn('users', 'last_name');
    await queryRunner.dropColumn('users', 'avatar_key');
  }
}
