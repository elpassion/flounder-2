import 'isomorphic-unfetch';
import dotenv from 'dotenv';
import nock from 'nock';
import { server } from './mocks';

dotenv.config({ path: '.env.test' });

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export const mockRouter = jest.fn();

export const routePushMock = jest.fn();

mockRouter.mockReturnValue({ route: '/', push: routePushMock });

jest.mock('next/router', () => ({
  useRouter: mockRouter,
}));

afterEach(() => {
  mockRouter.mockClear();
});

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

window.scroll = jest.fn();
window.alert = jest.fn();
