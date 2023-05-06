import { Factory, Seeder } from '@concepta/typeorm-seeding';
import { TodoFactory } from 'factories/todo.factory';
import { UserFactory } from 'factories/user.factory';
import { User, Todo } from '../entities';

export default class InitialDatabaseSeed extends Seeder {
    // public async run(factory: Factory<User>): Promise<void> {
    //     const users = await factory(User)().createMany(2);

    //     await factory(Todo)()
    //         .map(async (todo: any) => {
    //             todo.user = users[Math.floor(Math.random() * users.length)];
    //             return todo;
    //         })
    //         .createMany(100);
    // };
    async run() {
        const users = await this.factory(UserFactory).createMany(2);
        await this.factory(TodoFactory)
            .map(async (todo: any) => {
                todo.user = users[Math.floor(Math.random() * users.length)];
                return todo;
            })
            .createMany(100);
    }
};
