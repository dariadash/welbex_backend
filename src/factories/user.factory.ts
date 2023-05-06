import { faker } from '@faker-js/faker';
import { Factory } from '@concepta/typeorm-seeding';
import { User } from '../entities';

// define(User, () => {
//     const user = new User();
//     user.username = faker.internet.userName();
//     user.email = faker.internet.email();
//     user.password = faker.internet.password();
//     return user;
// });


export class UserFactory extends Factory<User> {
    protected async entity(): Promise<User> {
        const user = new User();
        user.username = faker.internet.userName();
        user.email = faker.internet.email();
        user.password = faker.internet.password();
        return user;
    };
};
