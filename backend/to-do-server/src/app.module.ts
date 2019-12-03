import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/models/todo.dto';
import { User } from './user/models/user.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host:'localhost',
      database:'nest',
      synchronize: true,
      entities:[User,Todo]

    }),
    MongooseModule.forRoot('mongodb://localhost/nest', 
    { useNewUrlParser: true }), 
    TodoModule, 
    UserModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
