import type { Static } from '@feathersjs/typebox';
import {
    Type,
    defaultAppConfiguration,
    getValidator,
} from '@feathersjs/typebox';

import { dataValidator } from './validators';

export const configurationSchema = Type.Intersect([
    defaultAppConfiguration,
    Type.Object({
        host: Type.String(),
        port: Type.Number(),
        public: Type.String(),
        'keyword-attributes': Type.String({ pattern: '^[^\\s]+$' }),
    }),
]);

export type ApplicationConfiguration = Static<typeof configurationSchema>;

export const configurationValidator = getValidator(
    configurationSchema,
    dataValidator,
);
