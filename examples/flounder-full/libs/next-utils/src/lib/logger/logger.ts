import pino, { Logger, LoggerOptions } from 'pino';

export const setupLogger = () => {
  const config = {
    serverUrl: process.env['PAGE_URL'],
    env: process.env['NODE_ENV'],
    publicUrl: process.env['PAGE_URL'],
  };

  const pinoConfig: LoggerOptions = {
    browser: {
      asObject: true,
    },
  };

  if (config.serverUrl) {
    pinoConfig.browser!.transmit = {
      level: 'info',
      send: (level, logEvent) => {
        const msg = logEvent.messages[0];

        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
          type: 'application/json',
        };
        const blob = new Blob([JSON.stringify({ msg, level })], headers);
        navigator.sendBeacon(`${config.serverUrl}/log`, blob);
      },
    };
  }

  const logger = pino(pinoConfig);

  return logger;
};

export type ILogger = Pick<
  Logger,
  'info' | 'warn' | 'debug' | 'error' | 'fatal'
>;
