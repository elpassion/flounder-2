// eslint-disable-next-line  @typescript-eslint/no-var-requires
require('dotenv').config({path: '.env.test'});
import '@testing-library/jest-dom'
import {server} from './test/mocks';
// Establish API mocking before all tests.
beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'error',
    })

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  }
);
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

export const mockRouter = jest.fn();

export const routePushMock = jest.fn();

mockRouter.mockReturnValue({route: '/', push: routePushMock});

jest.mock('next/router', () => ({
  useRouter: mockRouter,
}));

afterEach(() => {
  mockRouter.mockClear();
});
