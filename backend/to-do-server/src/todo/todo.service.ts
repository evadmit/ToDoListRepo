import { Injectable } from '@nestjs/common';
import { Todo, TodoDto, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, RequestAddToDoModelItem, SyncNewTodosModel, AllLocalTodosModelItem } from './models/todo.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {

    constructor(
        private userService: UserService,
        @InjectRepository(Todo) private todoRepository: Repository<Todo>
    ) 
    {
    }

    async create(todoDto: RequestAddToDoModelItem, email: string): Promise<Todo> {
        todoDto.userEmail = email;
        const createdTodo = await this.todoRepository.save(todoDto);
        await this.userService.appendTodo(email, createdTodo);
        return createdTodo;
    }

    async findAll(email: string): Promise<ResponseGetAllTodosModel> {

        const user = await this.userService.find(email);
        const todoList: ResponseGetAllTodosModel = {
            todoList: user.todos.map((value) => {
                const response: ResponseTodoGetAllTodosModelItem = {
                    _id: value._id,
                    title: value.title,
                    description: value.description,
                    isCompleted: value.isCompleted,
                    coordinates: value.coordinates,
                    image: value.image,
                    userEmail: value.userEmail
                };
                return response;
            })
        }
        return todoList;

    }

    async deleteTodo(todoID: any, email: string): Promise<any> {

        const deletedTodo = await this.todoRepository.find({ '_id': todoID, 'userEmail': email });
        await this.todoRepository.delete(todoID);

        if (deletedTodo) {

            await this.userService.deleteTodo(email, todoID);

        }
        return deletedTodo;
    }

    async editTodo(todoID: any, todoDto: TodoDto, email: string): Promise<Todo> {

        var oldTodo = await this.todoRepository.findOne(todoID);
        delete oldTodo.description;
        delete oldTodo.isCompleted;
        delete oldTodo.image;

        let updatedTodo = Object.assign(oldTodo, todoDto);

        await this.todoRepository.update(todoID,{description: todoDto.description, isCompleted:todoDto.isCompleted,image:todoDto.image});

        await this.userService.updateTodo(email, updatedTodo);
        return updatedTodo;
    }

    async editTodoStatus(todoID: any, email: string): Promise<Todo> {

        const targetTodo = await this.todoRepository.findOne(todoID);
        targetTodo.isCompleted = (!targetTodo.isCompleted);
        
        return await this.editTodo(todoID, targetTodo, email);
    }

    async syncTodos(todos: SyncNewTodosModel, email: string): Promise<boolean> {

        var todosToAdd = todos.todoList.filter(td => td.action == 0);
        var todosToUpdate = todos.todoList.filter(td => td.action == 1);
        var todosToDelete = todos.todoList.filter(td => td.action == 2);

        console.log("todosToAdd ", todosToAdd);
        console.log("todosToUpdate ", todosToUpdate);
        console.log("todosToDelete ", todosToDelete);
        try {
            await this.insertTodos(todosToAdd, email);
            await this.editTodos(todosToUpdate, email);
            await this.deleteTodos(todosToDelete, email);
        } catch (error) {
            return false;
        }


        return true;
    }

    async editTodos(todos: Array<AllLocalTodosModelItem>, email: string): Promise<boolean> {

        if (todos.length <= 0) {

            console.log("no todos");
            return false;
        }

        todos.forEach(async element => {
            await this.editTodo(element._id, element, email)
        });
        return true;
    }

    async insertTodos(todos: Array<AllLocalTodosModelItem>, email: string): Promise<boolean> {

        if (todos.length <= 0) {

            return;
        }

        await todos.forEach(td => td.userEmail = email);
        
        todos.forEach(async element => {
            var insertElement = Object.assign(new Todo(), element);
            await this.todoRepository.save(insertElement);
        });
      
        await this.userService.appendTodos(email, todos);

        return true;
    }

    async deleteTodos(todos: Array<AllLocalTodosModelItem>, email: string): Promise<boolean> {

        if (todos.length <= 0) {

            return;
        }

        todos.forEach(async todo => {
            await this.deleteTodo(todo._id, email)
        });

        return true;
    }

}