import * as express from 'express';
import multer from 'multer';

import { AppDataSource } from 'utils/dataSource';
import { isUserAuthorized, passport } from '../passport';
import { Todo, User } from '../entities';

const todoRouter = express.Router();
const entityManager = AppDataSource.manager;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_FILES_DIRECTORY as string);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

todoRouter.use('/todos', passport.authenticate('jwt'));
todoRouter.get('/todos', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const [todos, totalCount] = await entityManager.findAndCount(Todo,
            {
                where: { user: req.user },
                relations: ['user'],
                order: { createdDate: 'DESC' },
                skip: (Number(page) - 1) * 20,
                take: 20,
            }
        );
        return res.send({ todos, totalCount, page });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    };
});

todoRouter.post('/todos', upload.single('mediaContent'), isUserAuthorized, async (req, res) => {
    try {
        const { text, createdDate } = req.body;
        const todoTask = new Todo();
        todoTask.text = text;
        todoTask.createdDate = createdDate;
        todoTask.user = req.user as User;
        if (req.file) {
            todoTask.mediaContent = req.file.path;
        };
        const entityManager = AppDataSource.createEntityManager();
        await entityManager.save(todoTask);
        return res.send({ message: 'Todo created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    };
});

todoRouter.put('/todos/:id', async (req, res) => {
    const { text, createdDate } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    };

    const user = req.user;
    const todos = await entityManager.find(Todo, {
        where: { user: user }
    });
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    };
    todo.text = text;
    todo.createdDate = createdDate;
    if (req.file) {
        todo.mediaContent = req.file.path;
    };

    await entityManager.save(todo);
    return res.send({ message: 'Todo updated successfully' });
});

todoRouter.delete('/todos/:id', async (req, res) => {
    const user = req.user;
    const todos = await entityManager.find(Todo, {
        where: { user: user }
    });
    const todo = todos.find((t) => t.id === parseInt(req.params.id));

    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    };

    entityManager.delete(Todo, req.params.id);
    return res.send({ message: 'Todo deleted successfully' });
});

export { todoRouter };