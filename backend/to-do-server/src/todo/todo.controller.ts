import { Controller, Get } from '@nestjs/common';

@Controller('todo')
export class TodoController {
    @Get()
    getTodos(){
      return {
          todo: 'hey, I`m working!'
      }
    }


}
