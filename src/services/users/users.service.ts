import { Application, Id } from '@feathersjs/feathers';
import { MongooseServiceOptions, Service } from 'feathers-mongoose';
import { userKeywordsUpdate } from '../../hooks/user-keywords-update';
import { UserModel } from '../../models/user.model';
import { normalizeString } from '../../utils';

declare module '../../declarations' {
    interface ServiceTypes {
        users: UserService;
    }
}

export const users = (app: Application) => {
    const options: Partial<MongooseServiceOptions> = {
        Model: UserModel,
        paginate: app.get('paginate'),
        lean: true,
        multi: false,
        whitelist: ['$text', '$search'],
    };

    // Initialize our service with any options it requires
    app.use('/users', new UserService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('users');

    service.hooks({
        before: {
            find: [
                (context) => {
                    if (context.params.query?.q) {
                        context.params.query.$text = {
                            $search: normalizeString(context.params.query.q),
                        };
                        delete context.params.query.q;
                    }
                },
            ],
        },
        after: {
            create: [userKeywordsUpdate],
            update: [userKeywordsUpdate],
            patch: [userKeywordsUpdate],
        },
    });
};

class UserService extends Service {
    public async updateKeywords(
        _id: Id,
        attributes: Array<string>,
    ): Promise<void> {
        const user = await UserModel.findById(_id);
        const keywords = this.generateKeywords(user, attributes);

        await UserModel.updateOne({ _id }, { keywords });
    }

    private generateKeywords(model: any, attributes: Array<string>): string {
        const keywords = attributes
            .reduce((acc, attribute) => {
                if (
                    model[attribute] !== null &&
                    model[attribute] !== undefined
                ) {
                    acc.push(`${attribute}: ${model[attribute]}`);
                }
                return acc;
            }, [] as Array<string>)
            .join(', ');

        return normalizeString(keywords);
    }
}
