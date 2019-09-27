import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDto, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, RequestAddToDoModelItem } from './models/todo.dto';
import { Todo} from './intrfaces/todo.interface';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel('Todo') private todoModel: Model<Todo>,
        @InjectModel('User') private userModel: Model<User>,
        private userService: UserService
        ) {
    }

    async create(todoDto: RequestAddToDoModelItem, email :string ): Promise<Todo> {
        const createdTodo = new this.todoModel(todoDto); 
        await this.userService.appendTodo(email, createdTodo);
        return await createdTodo.save();
    }

    async findAll(email: string): Promise<ResponseGetAllTodosModel> {
        
        const user = await this.userService.find(email);

        console.log(user.todos);
        

        const todoList: ResponseGetAllTodosModel = {
            todoList: user.todos.map((value) => {                
                const response: ResponseTodoGetAllTodosModelItem = {
                    _id: value._id,
                    title: value.title,
                    description: value.description,
                    user_id: value.user_id,
                    isCompleted: value.isCompleted,
                    coordinates: value.coordinates,
                    image: value.image
                };
                return response;
            })
        }
        return todoList;
        
    }

    async deleteTodo(todoID: Number, email: string): Promise<any> {

       const deletedTodo = await this.todoModel.findByIdAndRemove(todoID);
        if(deletedTodo){
      await this.userService.deleteTodo(email, todoID);
       
    }
       return deletedTodo;
    }

    async editTodo(todoID: Number, todoDto:TodoDto, email :string ): Promise<Todo>{

        const editedTodo = await this.todoModel.findByIdAndUpdate(todoID, todoDto,{new: true});
        await this.userService.updateTodo(email, editedTodo);
        return editedTodo;
    }

    async editTodoStatus(todoID: Number, email :string ): Promise<Todo>{

        const targetTodo = await this.todoModel.findById(todoID);
        targetTodo.isCompleted = (!targetTodo.isCompleted);
        return await this.editTodo(todoID,targetTodo,email); 
    }
}