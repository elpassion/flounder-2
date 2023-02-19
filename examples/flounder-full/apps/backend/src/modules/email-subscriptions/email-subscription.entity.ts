import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'email_subscriptions' })
export class EmailSubscription {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ unique: true })
  readonly email!: string;

  @CreateDateColumn()
  readonly created_at!: Date;

  @UpdateDateColumn()
  readonly updated_at!: Date;
}
