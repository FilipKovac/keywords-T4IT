// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { Paginated } from '@feathersjs/feathers';
import assert from 'assert';
import { app } from '../../../src/app';

describe('users service', () => {
    const service = app.service('users');

    it('registered the service', () => {
        assert.ok(service, 'Registered the service');
    });

    it('create, update keywords and filter by it', async () => {
        const users = [
            {
                firstName: 'John',
                lastName: 'Doe',
                middleName: 'Smith',
                hobbies: 'Reading, Writing',
            },
            {
                firstName: 'Michael',
                lastName: 'Scott',
                middleName: 'Kennedy',
                hobbies: 'Hobbyhorsing, Standup Comedy',
            },
            {
                firstName: 'Peter',
                lastName: 'Parker',
                middleName: 'Johnson',
                hobbies: 'Networking, C#',
            },
        ];

        for (const user of users) {
            await service.create(user);
        }

        const allUsers = (await service.find()) as Paginated<any>;

        assert.equal(allUsers.total, users.length, 'Users created');

        let filteredUsers = (await service.find(
            createContextParams('smith hobbyhorsing'),
        )) as Paginated<any>;

        assert.equal(
            filteredUsers.total,
            1,
            'Users filtered by reading and hobbyhorsing',
        );

        filteredUsers = (await service.find(
            createContextParams('reading john peter'),
        )) as Paginated<any>;

        assert.equal(
            filteredUsers.total,
            2,
            'Users filtered by reading and john',
        );
    });
});

const createContextParams = (search: string) => ({
    query: {
        q: search,
    },
});
