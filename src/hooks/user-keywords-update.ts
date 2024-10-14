// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { HookContext } from '@feathersjs/feathers';
import { logger } from '../logger';

export const userKeywordsUpdate = async (context: HookContext) => {
    const { app, result, service } = context;

    const attributes = app
        .get('keyword-attributes')
        .split(',') as Array<string>;

    logger.info('Updating keywords', { result, attributes });

    await service.updateKeywords(result._id, attributes);
};
