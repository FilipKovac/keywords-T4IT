// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations';
import { users } from './users/users.service';

export const services = (app: Application) => {
    app.configure(users);
};
