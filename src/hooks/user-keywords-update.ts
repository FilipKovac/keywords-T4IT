// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { HookContext } from '@feathersjs/feathers';

export const userKeywordsUpdate = async (context: HookContext) => {
    const { app, result, service } = context;

    const attributes = app
        .get('keyword-attributes')
        .split(',') as Array<string>;

    await service.updateKeywords(result._id, attributes);
};
