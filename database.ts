import mongoose from 'mongoose';
import logger from './logger';
import { config } from './src/config';
import { ApiError } from './src/errors/globarErrorHandler';

export async function connectToDatabase(): Promise<void> {
    try {
        const mongoURI = config.uri as string;

        if (!mongoURI) {
            const errorMessage = 'MongoDB connection URI is not provided.';
            logger.error(errorMessage);
            throw new ApiError(500, errorMessage);
        }

        

        await mongoose.connect(mongoURI);

        logger.info('Connected to the database.');
    } catch (error) {
        logger.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

export async function disconnectFromDatabase(): Promise<void> {
    try {
        await mongoose.disconnect();
        logger.info('Disconnected from the database.');
    } catch (error) {
        logger.error('Failed to disconnect from the database:', error);
        process.exit(1);
    }
}
