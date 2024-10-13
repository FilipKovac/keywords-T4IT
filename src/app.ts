// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import configuration from '@feathersjs/configuration';
import express, {
    cors,
    errorHandler,
    json,
    notFound,
    rest,
    serveStatic,
    urlencoded,
} from '@feathersjs/express';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';

import { channels } from './channels';
import { configurationValidator } from './configuration';
import type { Application } from './declarations';
import { logError } from './hooks/log-error';
import { logger } from './logger';
import { mongooseDb } from './mongoose';
import { services } from './services';

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration(configurationValidator));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
// Host the public folder
app.use('/', serveStatic(app.get('public')));

// Configure services and real-time functionality
app.configure(rest());
app.configure(
    socketio({
        cors: {
            origin: app.get('origins'),
        },
    }),
);
app.configure(mongooseDb);
app.configure(services);
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(errorHandler({ logger }));

// Register hooks that run on all service methods
app.hooks({
    around: {
        all: [logError],
    },
    before: {},
    after: {},
    error: {},
});
// Register application setup and teardown hooks here
app.hooks({
    setup: [],
    teardown: [],
});

export { app };
