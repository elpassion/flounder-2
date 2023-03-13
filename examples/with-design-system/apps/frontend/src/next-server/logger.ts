import pino, { HttpLogger } from "pino-http";
import { PrettyOptions } from "pino-pretty";

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'] as const;

export type Level = typeof levels[number];

export function setupLogger(serviceName: string): HttpLogger {
  const logLevel = getCorrectLogLevel(process.env['LOG_LEVEL']);
  const options: PrettyOptions = {
    minimumLevel: logLevel,
    levelFirst: true,
    colorize: true,
  };
  return pino({
    level: 'info',
    redact: ['req.headers.authorization', 'res.headers["set-cookie"]', 'req.headers.cookie'],
    base: {
      service: serviceName,
    },
    transport:
      process.env.NODE_ENV !== 'development'
        ? undefined
        : {
          target: 'pino-pretty',
          options: options,
        },
  });
}

const isCorrectLogLevel = (logLevelEnv: string | undefined): logLevelEnv is Level => {
  if (logLevelEnv === undefined) return false;
  const level = levels.find((validLogLevel) => validLogLevel === logLevelEnv);
  return !!level;
}

const getCorrectLogLevel = (logLevelEnv: string | undefined): Level => {
  if (!logLevelEnv) return 'info';
  if (!isCorrectLogLevel(logLevelEnv)) return 'info';
  return logLevelEnv;
}


