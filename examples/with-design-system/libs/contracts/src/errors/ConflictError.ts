import { TConflict } from '../http-error.schema.type';
import { AxiosError, AxiosResponse } from 'axios';
import { isAxiosResponseError } from './AxiosResponseError';

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export function isConflictResponseError(error: unknown): error is ConflictResponseError {
  return isAxiosResponseError(error) && error.response.status === 409;
}

export type ConflictResponseError = AxiosError & { response: AxiosResponse<TConflict> };
