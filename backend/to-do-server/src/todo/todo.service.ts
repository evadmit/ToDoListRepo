import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDto } from './models/todo.dto';
import { Todo} from './intrfaces/todo.interface';

@Injectable()
export class TodoService {

    constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {
    }

    async create(todoDto: TodoDto): Promise<Todo> {

            const createdTodo = new this.todoModel(todoDto);
        return await createdTodo.save();
    }

    async findAll(): Promise<Todo[]> {

        return await this.todoModel.find().exec();
    }

    async deleteTodo(todoID: Number): Promise<any> {

        const deletedTodo = await this.todoModel.findByIdAndRemove(todoID);
        return deletedTodo;
    }

    async editTodo(todoID: Number, todoDto:TodoDto): Promise<Todo>{

        const editedTodo = await this.todoModel.findByIdAndUpdate(todoID, todoDto,{new: true});

        return editedTodo;
    }
}