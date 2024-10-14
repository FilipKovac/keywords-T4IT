// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import mongoose from 'mongoose';
import type { Application } from './declarations';
import { logger } from './logger';

export const mongooseDb = async (app: Application) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(app.get('mongodb') as string);

    mongoose.connection.on('connected', () => {
        logger.info('Mongoose connected');
    });

    mongoose.connection.on('error', (err) => {
        logger.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('Mongoose disconnected');
    });

    app.set('mongooseClient', mongoose);
};

declare module './declarations' {
    interface Configuration {
        mongooseClient: typeof mongoose;
    }
}
