export interface Todo  {
    id: string;
    name: string;
    status: boolean;
}

export type TodoBody = Omit<Todo, 'id'>

export interface TodoParams {
    id: string;
}

export interface PatchTodoBody {
    status: boolean;
}

export class AppError extends Error {
    constructor(public statusCode: number, message: string){
        super(message)
    }
}