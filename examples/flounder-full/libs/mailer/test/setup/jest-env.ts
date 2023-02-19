import { NodeEnvironment } from '../../src/lib/enums/node-environment.enum';

const testEnv = {
  NODE_ENV: NodeEnvironment.Test,
  PORT: 33333,
  API_PREFIX: 'api',
};

process.env = Object.assign(process.env, testEnv);
