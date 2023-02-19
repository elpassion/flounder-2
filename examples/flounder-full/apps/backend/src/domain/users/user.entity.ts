import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ unique: true })
  readonly cognito_id!: string;

  @Column({ unique: true })
  readonly email!: string;

  @Column({ nullable: true })
  readonly first_name!: string;

  @Column({ nullable: true })
  readonly last_name!: string;

  @Column({ nullable: true })
  readonly avatar_key?: string;

  @Column({ nullable: true })
  readonly description!: string;

  @CreateDateColumn()
  readonly created_at!: Date;

  @UpdateDateColumn()
  readonly updated_at!: Date;
}
