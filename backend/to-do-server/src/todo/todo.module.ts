import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './todo.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule,
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService]
})
export class TodoModule { }
