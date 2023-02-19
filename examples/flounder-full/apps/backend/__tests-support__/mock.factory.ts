import { instance } from 'ts-mockito';

export const mockFactory = (MockClass: any) => ({ factory: () => instance(MockClass) });
