import { IsString } from 'class-validator';

export class NotificationDTO {
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}
