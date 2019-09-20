import { Controller, Get, Res, HttpStatus, Post, Body, Delete, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto, ResponseGetAllTodosModel, RequestAddToDoModelItem } from './models/todo.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { Todo } from './intrfaces/todo.interface';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/shared/user.decorator';
import { User } from 'src/user/interfaces/user.interface';


@Controller('todo')
export class TodoController {

constructor(private readonly toDoService:TodoService) {}

@Get('todos')
@UseGuards(AuthGuard('jwt'))
async findAll(@UserDecorator() user):Promise<ResponseGetAllTodosModel> {
  const todos= await  this.toDoService.findAll((user as User).email);
  console.log(todos);
  
 return todos;
 }
 
 @Post('add-todo')
 @UseGuards(AuthGuard('jwt'))
 async create(@Res() res, @Body() todoDto:RequestAddToDoModelItem, @UserDecorator() user) {
  console.log(todoDto);
  const newTodo= await this.toDoService.create(todoDto,(user as User).email);
 return res.status(HttpStatus.OK).json({message:"Item added", todo: newTodo})
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteTodo(@Res() res,@Query('todoID', new ValidateObjectId())todoID, @UserDecorator() user)
  {
    const deletedTodoItem  = await this.toDoService.deleteTodo(todoID,(user as User).email);

    if(!deletedTodoItem) throw new NotFoundException('Item doesn`t exist');
    return res.status(HttpStatus.OK).json({
      message: 'Item deleted',
      todo: deletedTodoItem
    })
  }

  @Post('edit')
  @UseGuards(AuthGuard('jwt'))
  async editTodo(@Res() res, @Query('todoID',new ValidateObjectId())todoID, @Body() todoDto:TodoDto,@UserDecorator() user){

    const editedTodo= await this.toDoService.editTodo(todoID, todoDto,(user as User).email);
    if(!editedTodo) throw new NotFoundException ('Item doesn`t extst');

    return res.status(HttpStatus.OK).json({
      message:'Item updated',
      todo: editedTodo
    })

  }
}