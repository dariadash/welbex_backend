import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from '../entities';

define(User, () => {
    const user = new User();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
});
