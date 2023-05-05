import * as express from 'express';
import jwt from 'jsonwebtoken';

import { AppDataSource } from 'utils/dataSource';
import { passport, JWT_SECRET_KEY } from '../passport';
import { User } from '../entities';

const userRouter = express.Router();
const entityManager = AppDataSource.manager;

userRouter.use('/users', passport.authenticate('jwt'));
userRouter.get('/users', async (req, res) => {
    const users = await entityManager
        .getRepository(User)
        .find()
    res.send(users);
});

userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    };

    const entityManager = AppDataSource.createEntityManager();
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    await entityManager.save(user);

    return res.status(201).json({ message: 'User created successfully' });
});


userRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    };

    const user = await entityManager.findOne(User, {
        where: {
            email
        },
    });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    };

    passport.authenticate('jwt', () => {
        req.login(user as User, (err) => {
            if (err) {
                res.send(err)
            }
            const token = jwt.sign({ user }, JWT_SECRET_KEY)
            return res.json({ token })
        })
    })(req, res);
});


userRouter.delete('/users/:id', (req, res) => {
    entityManager.delete(User, req.params.id);
    res.send({ message: 'User deleted' });
});

export { userRouter };