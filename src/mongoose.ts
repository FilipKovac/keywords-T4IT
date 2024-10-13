// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import mongoose from 'mongoose';
import type { Application } from './declarations';

declare module './declarations' {
    interface Configuration {
        mongooseClient: typeof mongoose;
    }
}

export const mongooseDb = async (app: Application) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(app.get('mongodb') as string);

    app.set('mongooseClient', mongoose);
};
