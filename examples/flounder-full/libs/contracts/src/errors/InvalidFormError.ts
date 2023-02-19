import { BadRequestDTO } from '../http-error.dto';
import { AxiosError, AxiosResponse } from 'axios';
import { isAxiosResponseError } from './AxiosResponseError';
import { ValidationError } from 'class-validator';

export class InvalidFormError extends Error {
  public formError: ValidationError[];

  constructor(formError: ValidationError[]) {
    super('Invalid Form');
    this.formError = formError;
  }
}

export function isInvalidFormResponseError(error: unknown): error is InvalidFormResponseError {
  return (
    isAxiosResponseError(error) &&
    error.response.data.statusCode === 400 &&
    Array.isArray(error.response.data.message)
  );
}

export type InvalidFormResponseError = AxiosError & { response: AxiosResponse<BadRequestDTO> };
