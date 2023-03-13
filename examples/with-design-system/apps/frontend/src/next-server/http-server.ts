import { IncomingMessage, ServerResponse, createServer as createHttpServer, Server } from 'http';
import stream from 'stream';
import { parse } from 'url';

import { Level, setupLogger } from './logger';

export const createServer = async (
  serviceName: string,
  handleRequest: (request: IncomingMessage, response: ServerResponse) => Promise<void>,
): Promise<Server> => {
  const logger = setupLogger(serviceName);

  return createHttpServer((request: IncomingMessage, response: ServerResponse) => {
    logger(request, response);

    if (isLogRequest(request)) {
      handleLogRequest(request, response);
    } else {
      handleRequest(request, response);
    }
  });
};

const isLogRequest = (request: IncomingMessage): boolean => {
  const parsedUrl = parse(request.url || '', true);
  const { pathname } = parsedUrl;
  return pathname === '/log';
};

const handleLogRequest = (request: IncomingMessage, response: ServerResponse) => {
  request.setEncoding('utf8');

  let data = '';
  request.on('data', chunk => {
    data += chunk;
  });

  stream.finished(request, error => {
    if (error) {
      request.log.error(error);
      return errorResponse(response);
    }
    try {
      const { msg, level = 'info' } = JSON.parse(data);
      request.log[level as Level](msg);
    } catch (err) {
      return errorResponse(response);
    }
    return okResponse(response);
  });
};

const okResponse = (response: ServerResponse) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('message logged on server');
};

const errorResponse = (response: ServerResponse) => {
  response.statusCode = 500;
  response.setHeader('Content-Type', 'text/plain');
  response.end('error occurred when logging on server');
};
