import { HttpClient } from '../HttpClient';
import { exampleBaseUrl } from './mocks';

export const createTestHttpClient = () => {
  return new HttpClient({ url: exampleBaseUrl });
};
