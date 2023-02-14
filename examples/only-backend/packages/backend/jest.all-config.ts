import defaultConfig from './jest.e2e-config';

export default {
  ...defaultConfig,
  testMatch: ['./**/*.spec.ts', './**/*.e2e-spec.ts'],
  coverageReporters: ['lcov'],
};
