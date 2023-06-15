import winston from 'winston';
import 'winston-daily-rotate-file';
import expressWinston from 'express-winston';
import path from 'path';

const logLevel = process.env.LOG_LEVEL || 'info';

// Set the logs directory path
const logsDir = path.join(process.cwd(), 'logs');

// Configure Winston transports
const transports = [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
        dirname: path.join(logsDir, 'success'),
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info',
    }),
    new winston.transports.DailyRotateFile({
        dirname: path.join(logsDir, 'error'),
        filename: 'error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error',
    }),
];

// Create a Winston logger instance
const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports,
});

// Express middleware for logging HTTP requests
export const expressLogger = expressWinston.logger({
    transports,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    expressFormat: true,
    colorize: false,
});

// Express error logger
export const expressErrorLogger = expressWinston.errorLogger({
    transports,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
});

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception occurred:', error);
    process.exit(1);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled promise rejection:', reason);
    process.exit(1);
});

export default logger;
