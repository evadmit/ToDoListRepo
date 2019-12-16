import { Controller, Get, Res, HttpStatus, Post, Body, Delete, Query, NotFoundException, UseGuards, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto, ResponseGetAllTodosModel, RequestAddToDoModelItem, SyncNewTodosModel } from './models/todo.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { Todo } from './intrfaces/todo.interface';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/shared/user.decorator';
import { User } from 'src/user/interfaces/user.interface';


@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {

  constructor(private readonly toDoService: TodoService) { }

  @Get('todos')
  async findAll(@UserDecorator() user): Promise<ResponseGetAllTodosModel> {
    console.log("response from client! load todos");
    const todos = await this.toDoService.findAll((user as User).email);
    return todos;
  }

  @Post('add')
  async create(@Body() todoDto: RequestAddToDoModelItem, @UserDecorator() user): Promise<any> {
    console.log("response from client! Add to do");
    const newTodo = await this.toDoService.create(todoDto, (user as User).email);

    return newTodo;
  }

  @Delete('delete')
  async deleteTodo(@Query('todoID', new ValidateObjectId()) todoID, @UserDecorator() user) {
    const deletedTodoItem = await this.toDoService.deleteTodo(todoID, (user as User).email);
    console.log("Item deleted ", deletedTodoItem);
    if (!deletedTodoItem) throw new NotFoundException('Item doesn`t exist');
    return deletedTodoItem;
  }

  @Post('edit')
  async editTodo(@Query('todoID', new ValidateObjectId()) todoID, @Body() todoDto: TodoDto, @UserDecorator() user) {

    const editedTodo = await this.toDoService.editTodo(todoID, todoDto, (user as User).email);

    return editedTodo;

  }

  @Post('change-status')
  async editTodoStatus(@Query('todoID', new ValidateObjectId()) todoID, @UserDecorator() user) {

    const editedTodo = await this.toDoService.editTodoStatus(todoID, (user as User).email);
    return editedTodo;

  }

  @Post('sync-todos')
  async syncTodos(@Body() newTodos: SyncNewTodosModel, @UserDecorator() user): Promise<boolean> {

    console.log("starting to sync");

    const res = await this.toDoService.syncTodos(newTodos, (user as User).email);
    console.log(res);
    return res;
  }
}