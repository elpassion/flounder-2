import { Logger } from 'pino';
import React, { useContext, useState } from 'react';
import { ILogger, setupLogger } from './logger';

const LoggerContext = React.createContext<ILogger | null>(null);

export function LoggerProvider(props: { children: React.ReactNode }) {
  const [logger] = useState(() => setupLogger());

  return (
    <LoggerErrorBoundary logger={logger}>
      <LoggerContext.Provider value={logger}>
        {props.children}
      </LoggerContext.Provider>
    </LoggerErrorBoundary>
  );
}

export function useLogger() {
  const logger = useContext(LoggerContext);
  if (!logger)
    throw new Error('Logger not available. Wrap component in LoggerProvider');
  return logger;
}

class LoggerErrorBoundary extends React.Component<{
  children: React.ReactNode;
  logger: Logger;
}> {
  constructor(props: { children: React.ReactNode; logger: Logger }) {
    super(props);
  }

  override componentDidCatch(error: unknown) {
    this.props.logger.error(error);
    throw error;
  }

  override render() {
    return this.props.children;
  }
}
