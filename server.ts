import express from 'express';
import { Server } from 'http';
import { connectToDatabase, disconnectFromDatabase } from './database';
import logger, { expressLogger, expressErrorLogger } from './logger';
import app from "./src/app/app"
import { config } from './src/config';

let server: Server;

connectToDatabase()
    .then(() => {
        server = app.listen(config.port, () => {
            logger.info(`Server is running on port ${config.port}`);
        });
    })
    .catch((error: Error) => {
        logger.error('Failed to start the server:', error);
        process.exit(1);
    });



process.on('SIGINT', () => {
    server.close(() => {
        disconnectFromDatabase()
            .then(() => {
                logger.info('Server and database connection closed.');
                process.exit(0);
            })
            .catch((error: Error) => {
                logger.error('Failed to disconnect from the database:', error);
                process.exit(1);
            });
    });
});
