import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class Migrations1683237459142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    isUnique: true,
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: 'todos',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'text',
                    type: 'varchar',
                },
                {
                    name: 'mediaContent',
                    isNullable: true,
                    type: 'varchar',
                },
                {
                    name: 'createdDate',
                    type: 'timestamp',
                }
            ]
        }), true);

        await queryRunner.addColumn('todos', new TableColumn({ name: 'userId', type: 'integer' }));

        await queryRunner.createForeignKey('todos', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            name: 'todos_userId_users_id'
        }));
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('todos', 'todos_userId_users_id');
        await queryRunner.dropColumn('todos', 'userId');
        await queryRunner.dropTable('todos');
        await queryRunner.dropTable('users');
    };

};
