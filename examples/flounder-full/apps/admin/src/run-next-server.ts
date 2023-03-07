import path from "path";

import { AppServerConfig, runAppServer } from "./next-server";

const config: AppServerConfig = {
  name: "admin",
  appDir: process.env['NX_NEXT_DIR'] || path.join(__dirname, '..'),
  port: process.env['PORT'] ? parseInt(process.env['PORT']) : 3002,
  hostname: process.env['HOSTNAME'] || 'localhost'
};

runAppServer(config).catch((error: any) => {
  console.error(error);
  process.exit(1);
});