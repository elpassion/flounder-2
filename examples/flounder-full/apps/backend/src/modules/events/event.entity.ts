import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn } from 'typeorm';
import { EventTypeEnum } from './enums/event-type.enum';
import { EventDetails } from './interfaces/event-details.type';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'text' })
  readonly type!: EventTypeEnum;

  @Column({ type: 'json' })
  readonly details!: EventDetails<EventTypeEnum>;

  @CreateDateColumn()
  readonly created_at!: Date;
}
