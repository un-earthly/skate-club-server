import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    uri: process.env.DB_URI,
    port: process.env.PORT||3000,
    env: process.env.NODE_ENV || 'development',
};
