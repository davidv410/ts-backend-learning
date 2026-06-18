import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { Todo, TodoBody, PatchTodoBody, TodoParams } from '../types.js';
import { AppError } from '../types.js'

const router = express.Router()

const todos: Todo[] = []

router.get('/', (req, res) => {
    res.json(todos);
});

router.get('/:id', (req: Request<TodoParams, {}, {}>, res, next: NextFunction) => {
    try{
        const { id } = req.params

        const find = todos.find(t => t.id === id)
        if(!find){
            throw new AppError(404, 'Todo not found')
        }
        return res.json(find)
    }catch(err){
        next(err)
    }
});

router.post('/', (req: Request<{}, {}, TodoBody>, res: Response, next: NextFunction) => {
    try{
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            ...req.body
        }
        todos.push(newTodo)
        return res.status(201).json(todos)
    }catch(err){
        next(err)
    }
})

router.patch('/:id', (req: Request<TodoParams, {}, PatchTodoBody>, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
        const { status } = req.body
    
        const todo = todos.find(t => t.id === id);
    
        if (!todo) {
            throw new AppError(404, 'Todo not found')
        }

        todo.status = status;
        return res.json(todos)
    }catch(err){
        next(err)
    }
})

router.put('/:id', (req: Request<TodoParams, {}, TodoBody>, res: Response, next: NextFunction) => {
    try{
    const { id } = req.params
    const index = todos.findIndex(t => t.id === id)
    if(index === -1){
        throw new AppError(404, 'Todo not found')
    }
    todos[index] = { id, ...req.body }
    return res.json(todos)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', (req: Request<TodoParams, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
    
        const filter = todos.filter(t => t.id !== id)
    
        const deleted = todos.length !== filter.length;
    
        if (!deleted) {
            throw new AppError(404, 'Todo not found')
        }
    
        todos.length = 0;
        todos.push(...filter);
    
        return res.status(200).json(todos);
    }catch(err){
        next(err)
    }
})

export default router