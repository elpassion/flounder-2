import path from 'path';

import { AppServerConfig, runAppServer } from './next-server';

const config: AppServerConfig = {
  name: 'frontend',
  appDir: process.env['NX_NEXT_DIR'] || path.join(__dirname, '..'),
  port: process.env['PORT'] ? parseInt(process.env['PORT']) : 3000,
  hostname: process.env['HOSTNAME'] || 'localhost',
};

runAppServer(config).catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
