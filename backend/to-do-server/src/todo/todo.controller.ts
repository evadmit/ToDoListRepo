import { Controller, Get, Res, HttpStatus, Post, Body, Delete, Query, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './models/todo.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';


@Controller('todo')
export class TodoController {

constructor(private readonly toDoService:TodoService) {}

@Get('todos')
async findAll(@Res() res) {
  debugger;
  const todos= await  this.toDoService.findAll();
 return res.status(HttpStatus.OK).json(todos);
 }
 
 @Post('add-todo')
 async create(@Res() res, @Body() todoDto:TodoDto) {

  const newTodo= await this.toDoService.create(todoDto);
 return res.status(HttpStatus.OK).json({message:"Item added", todo: newTodo})
  }

 // http://localhost:3003/todo/delete?todoID=5d527b2762570509e809b53a example
  @Delete('delete')
  async deleteTodo(@Res() res,@Query('todoID', new ValidateObjectId())todoID)
  {
    const deletedTodoItem  = await this.toDoService.deleteTodo(todoID);

    if(!deletedTodoItem) throw new NotFoundException('Item doesn`t exist');
    return res.status(HttpStatus.OK).json({
      message: 'Item deleted',
      todo: deletedTodoItem
    })
  }

  @Post('edit')
  async editTodo(@Res() res, @Query('todoID',new ValidateObjectId())todoID, @Body() todoDto:TodoDto){

    const editedTodo= await this.toDoService.editTodo(todoID, todoDto);
    if(!editedTodo) throw new NotFoundException ('Item doesn`t extst');

    return res.status(HttpStatus.OK).json({
      message:'Item updated',
      todo: editedTodo
    })

  }
}