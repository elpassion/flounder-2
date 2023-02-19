import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'fake-mock' })
export class Mock {
  @PrimaryGeneratedColumn()
  readonly id!: number
}
