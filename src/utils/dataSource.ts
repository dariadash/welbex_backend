require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as unknown as number || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    type: 'postgres',
    logging: false,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
});
