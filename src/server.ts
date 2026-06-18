import express from 'express';
import todosRouter from './routes/todos.js'
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/todos', todosRouter);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});