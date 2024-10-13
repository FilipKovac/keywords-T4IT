// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { logger } from '@app/logger';
import type { HookContext } from '../declarations';

export const userKeywordsSet = async (context: HookContext) => {
    logger.info(
        `Running hook user-keywords-set on ${context.path}.${context.method}`,
    );

    const { data, app } = context;

    const attributes = app.get('keyword-attributes');
    // update data with keywords and save it to elastic search

    // const elasticSearchService = app.service('users/find');
    // await elasticSearchService.({
    //     ...data,
    //     attributes,
    // });
};
