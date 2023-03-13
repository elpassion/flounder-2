import { HttpClient } from '@flounder/http-client';
import { getEnvVariables } from './env';

export const createHttpClient = () => {
  return HttpClient.getInstance({ url: getEnvVariables().PAGE_URL });
};
