import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './interfaces/user.interface';
import {UserDto, RegisterDTO, LoginDTO} from './models/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { TodoDto } from 'src/todo/models/todo.dto';
import { Todo } from 'src/todo/intrfaces/todo.interface';

@Injectable()
export class UserService {
    
constructor(@InjectModel('User')private userModel:Model<User>) {}
   
async create(userDTO: RegisterDTO) {
    const { email } = userDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return createdUser;
}

async appendTodo(email: string,todo: Todo) {
  const user = await this.userModel.findOne({ email });
  console.log(user._id);
  if (user) { 
    console.log(todo);
    user.todos.push(todo);
    user.save();
  }
  return ;
}

async updateTodo(email: string, todo: Todo) {
  const user = await this.userModel.findOne({ email });
  console.log(user._id, todo._id);
  if (user) { 
   var todoss= user.update({"todos._id":todo._id}, {$set:{"todos.$[]":todo}});
   console.log(todoss);
    user.save();
  }
  return ;
}

async findByLogin(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userModel
      .findOne({ email })
      .select('email password');
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

async find( email:string): Promise<User>
    {
return await this.userModel.findOne({email: email});
    }  
}
