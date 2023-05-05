import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({
        nullable: true,
        type: 'varchar'
    })
    mediaContent: string;

    @Column({
        name: 'createdDate',
        type: 'timestamp'
    })
    createdDate: Date;

    @ManyToOne(() => User, user => user.todos)
    @JoinColumn({ name: 'userId' })
    user: User;
};
