import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

import { createServer } from './http-server';
import { createNextApp } from './next-app';

export type AppServerConfig = {
  name: string;
  appDir: string;
  port: number;
  hostname: string;
};

export const runAppServer = async (config: AppServerConfig): Promise<void> => {
  const app = await createNextApp(config.appDir, config.hostname, config.port);
  const appRequestHandler = app.getRequestHandler();
  await app.prepare();

  const server = await createServer(
    config.name,
    (request: IncomingMessage, response: ServerResponse) => {
      const parsedUrl = parse(request.url || '', true);
      return appRequestHandler(request, response, parsedUrl);
    },
  );

  server.listen(config.port, config.hostname);

  console.log(`[ ready ] on http://${config.hostname}:${config.port}`);
};
