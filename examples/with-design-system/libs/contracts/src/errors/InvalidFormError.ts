import { AxiosError, AxiosResponse } from 'axios';
import { ZodIssue } from 'nestjs-zod/z';
import { TBadRequest } from '../http-error.schema.type';
import { isAxiosResponseError } from './AxiosResponseError';

export class InvalidFormError extends Error {
  public formError: ZodIssue[];

  constructor(formError: ZodIssue[]) {
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

export type InvalidFormResponseError = AxiosError & { response: AxiosResponse<TBadRequest> };
