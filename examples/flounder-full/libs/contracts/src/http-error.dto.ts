import { ValidationError } from 'class-validator';

export class BadRequestDTO {
  statusCode!: 400;
  message!: ValidationError[];
  error!: 'Bad Request';
}

export class ConflictDTO {
  statusCode!: 409;
  message!: string;
}
