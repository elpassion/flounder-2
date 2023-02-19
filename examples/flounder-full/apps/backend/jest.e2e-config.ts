/* eslint-disable */
export default {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', {tsconfig: '<rootDir>/tsconfig.spec.json'}],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['./**/*.e2e-spec.ts'],
  setupFiles: ['./__tests-support__/jest-setup/pre-setup-jest-env.ts'],
  setupFilesAfterEnv: ['./__tests-support__/jest-setup/post-setup-jest-env.ts'],
  maxWorkers: 1,
};
