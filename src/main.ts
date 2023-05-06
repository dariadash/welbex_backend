import express from 'express';
import session from 'express-session';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { JWT_SECRET_KEY, passport } from './passport';
import { AppDataSource } from './utils/dataSource';
import { todoRouter, userRouter } from './controllers';
import seedingSource from './seeding-source'

require('dotenv').config();
const swaggerDocument = YAML.load('swagger.yaml');

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(passport.initialize());
        app.use(bodyParser.json());
        app.use(session({
            secret: JWT_SECRET_KEY,
            resave: false,
            saveUninitialized: false
        }));
        app.use('/api', userRouter);
        app.use('/api', todoRouter);
        app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument, { explorer: true })
        );

        app.get('/', (req, res, next) => {
            res.send('respond with a resource')
        });

        app.listen(process.env.PORT, () => console.log(`сервер запущен на ${process.env.PORT} порту`));
    })
    .catch((error) => console.log(error));

seedingSource.dataSource = AppDataSource
