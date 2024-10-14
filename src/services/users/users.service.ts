import { Application, Id } from '@feathersjs/feathers';
import { Service } from 'feathers-mongoose';
import { userKeywordsUpdate } from '../../hooks/user-keywords-update';
import { logger } from '../../logger';
import { UserModel } from '../../models/user.model';

export const users = (app: Application) => {
    const options = {
        Model: UserModel,
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/users', new UserService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('users');

    service.hooks({
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

        logger.info('Updating keywords', { _id, keywords, attributes });

        await UserModel.updateOne({ _id }, { keywords });
    }

    private generateKeywords(model: any, attributes: Array<string>): string {
        return attributes
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
    }
}
