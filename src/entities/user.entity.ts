import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import { Todo } from './todo.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Index('email_index')
    @Column({
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        select: false,
    })
    password: string;

    @OneToMany(() => Todo, todo => todo.user)
    todos: Todo[];

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, salt)
    };
};
