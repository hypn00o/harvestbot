import { createLogger, format, transports } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

export default ({ inGoogleCloud }) => {
  const { Console } = transports;

  const appTransports = {
    default: [
      ...(inGoogleCloud ? [new LoggingWinston()] : []),
      new Console(),
    ],
  };

  const exceptionHandlers = {
    default: [
      ...(inGoogleCloud ? [new LoggingWinston()] : []),
      new Console(),
    ],
  };

  const loggingConfig = {
    ...(inGoogleCloud ? {} : {
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
    level: 'info',
    transports: appTransports.default,
    exceptionHandlers: exceptionHandlers.default,
    exitOnError: true,
  };

  const logger = createLogger(loggingConfig);

  return logger;
};
