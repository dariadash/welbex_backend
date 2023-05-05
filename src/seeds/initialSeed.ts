import { Factory, Seeder } from 'typeorm-seeding';
import { User, Todo } from '../entities';

export default class InitialDatabaseSeed implements Seeder {
    public async run(factory: Factory): Promise<void> {
        const users = await factory(User)().createMany(2);

        await factory(Todo)()
            .map(async (todo) => {
                todo.user = users[Math.floor(Math.random() * users.length)];
                return todo;
            })
            .createMany(100);
    };
};
