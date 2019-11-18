import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDto, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, RequestAddToDoModelItem, SyncNewTodosModel, AllLocalTodosModelItem } from './models/todo.dto';
import { Todo} from './intrfaces/todo.interface';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { Action } from './models/common';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel('Todo') private todoModel: Model<Todo>,
        @InjectModel('User') private userModel: Model<User>,
        private userService: UserService
        ) {
    }

    async create(todoDto: RequestAddToDoModelItem, email :string ): Promise<Todo> {
        todoDto.userEmail = email;
        const createdTodo = new this.todoModel(todoDto); 
        await this.userService.appendTodo(email, createdTodo);
        return await createdTodo.save();
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
                    userEmail :value.userEmail
                };
                return response;
            })
        }
        return todoList;
        
    }

    async deleteTodo(todoID: any, email: string): Promise<any> {

       const deletedTodo = await this.todoModel.find({'_id':todoID, 'userEmail': email}).remove();
        if(deletedTodo){
            
        await this.userService.deleteTodo(email, todoID);
       
    }
       return deletedTodo;
    }

    async editTodo(todoID: any, todoDto:TodoDto, email :string ): Promise<Todo>{

        const editedTodo = await this.todoModel.findByIdAndUpdate(todoID, todoDto,{new: true});
        await this.userService.updateTodo(email, editedTodo);
        return editedTodo;
    }

    async editTodoStatus(todoID: any, email :string ): Promise<Todo>{

        const targetTodo = await this.todoModel.findById(todoID);
        targetTodo.isCompleted = (!targetTodo.isCompleted);
        return await this.editTodo(todoID,targetTodo,email); 
    }

    async syncTodos(todos: SyncNewTodosModel, email :string) : Promise<boolean>{
        
       var todosToAdd = todos.todoList.filter(td => td.action == 0);
       var todosToUpdate = todos.todoList.filter(td => td.action == 1);
       var todosToDelete = todos.todoList.filter(td => td.action == 2);

       console.log("todosToAdd ", todosToAdd);
       console.log("todosToUpdate ", todosToUpdate);
       console.log("todosToDelete ", todosToDelete);

        await this.insertTodos(todosToAdd, email);
        await this.editTodos(todosToUpdate, email);
        await this.deleteTodos(todosToDelete, email);

        return true;
    }

    async editTodos(todos: Array<AllLocalTodosModelItem>, email :string): Promise<boolean>{

        if(todos.length<=0){

            console.log("no todos");
            return false;
        }

       todos.forEach(async element => {
            await this.editTodo(element._id, element, email)
        });
        return true;
    }

    async insertTodos(todos: Array<AllLocalTodosModelItem>, email :string): Promise<boolean>{

        if(todos.length<=0){

            return ;
        }

        await  todos.forEach(td => td.userEmail = email);
       var res =  await this.todoModel.insertMany(todos);
       await this.userService.appendTodos(email, res);

        return true;
    }

    async deleteTodos(todos: Array<AllLocalTodosModelItem>, email :string): Promise<boolean>{

        if(todos.length<=0){

            return ;
        }

      todos.forEach(async todo =>{
            await this.deleteTodo(todo._id, email)
        });
  
        return true;
    }

}