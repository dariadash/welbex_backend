import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Todo } from '../entities';

define(Todo, () => {
    const todo = new Todo();
    todo.text = faker.lorem.paragraph(6);
    todo.createdDate = faker.date.past();
    return todo;
});
