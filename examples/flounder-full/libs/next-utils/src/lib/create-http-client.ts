import { HttpClient } from '@flounder/http-client';
import { getEnvVariables } from './env';

export const createHttpClient = () => {
  return new HttpClient({
    url: getEnvVariables().PAGE_URL,
  });
};
