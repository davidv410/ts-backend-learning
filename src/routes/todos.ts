import { PrismaClient } from '@prisma/client';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import type { Todo, TodoBody, PatchTodoBody, TodoParams } from '../types.js';
import { AppError } from '../types.js'

const router = express.Router()

const prisma = new PrismaClient()


router.get('/', async (req, res, next) => {
    try {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req: Request<TodoParams, {}, {}>, res, next: NextFunction) => {
    try{
        const { id } = req.params

        const find = await prisma.todo.findUnique({ where: { id } })
        if(!find){
            throw new AppError(404, 'Todo not found')
        }
        return res.json(find)
    }catch(err){
        next(err)
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newTodo = await prisma.todo.create({
            data: req.body
        });
        return res.status(201).json(newTodo);
    }catch(err){
        next(err)
    }
})

router.patch('/:id', async (req: Request<TodoParams, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
    
        const todo = await prisma.todo.update({ where: { id }, data: req.body });
    
        if (!todo) {
            throw new AppError(404, 'Todo not found')
        }

        return res.json('todo updated')
    }catch(err){
        next(err)
    }
})


router.delete('/:id', async (req: Request<TodoParams, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
    
        const removeTodo = await prisma.todo.delete({ where: { id } })
    
        return res.status(200).json('todo removed');
    }catch(err){
        next(err)
    }
})

export default router