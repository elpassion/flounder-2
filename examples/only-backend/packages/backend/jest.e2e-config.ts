/* eslint-disable */
export default {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/backend',
  testMatch: ['./**/*.e2e-spec.ts'],
  setupFiles: ['./test/setup/jest-env.ts'],
  setupFilesAfterEnv: ['./test/setup/post-env.ts'],
  maxWorkers: 1,
};
