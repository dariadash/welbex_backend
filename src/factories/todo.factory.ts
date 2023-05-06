import { faker } from '@faker-js/faker';
import { Factory } from '@concepta/typeorm-seeding';
import { Todo } from '../entities';

// define(Todo, () => {
//     const todo = new Todo();
//     todo.text = faker.lorem.paragraph(6);
//     todo.createdDate = faker.date.past();
//     return todo;
// });

export class TodoFactory extends Factory<Todo> {
    protected async entity(): Promise<Todo> {
        const todo = new Todo();
        todo.text = faker.lorem.paragraph(6);
        todo.createdDate = faker.date.past();
        return todo;
    };
};
