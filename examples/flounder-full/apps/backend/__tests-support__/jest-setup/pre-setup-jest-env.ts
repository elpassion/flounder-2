import { NodeEnvironment } from '../../src/shared/common/configuration/node-environment';

const testEnv = {
  NODE_ENV: NodeEnvironment.Test,
  PORT: 33333,
  API_PREFIX: 'api',
};

process.env = Object.assign(process.env, testEnv);
