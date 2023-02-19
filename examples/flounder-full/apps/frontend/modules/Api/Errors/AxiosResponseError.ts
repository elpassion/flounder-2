import { AxiosError, AxiosResponse } from 'axios';

export function isAxiosResponseError(error: unknown): error is AxiosResponseError {
  return typeof error === 'object' && error !== null && 'response' in error;
}

export type AxiosResponseError = AxiosError & { response: AxiosResponse };

export class NotFoundError extends Error {}
