import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserDto, RegisterDTO, LoginDTO, EditUserDto } from './models/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { Todo } from 'src/todo/intrfaces/todo.interface';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private userModel: Model<User>) { }

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

  async findOrCreate(profile): Promise<User> {
    const user = await this.userModel
      .findOne({ 'email':profile.emails[0].value })
      .exec();
    if (user) {
      return user;
    }
    const createdUser = new this.userModel({
      password: profile.id,
      email: profile.emails[0].value,
      name: profile.name.givenName,
      facebook: {
        id: profile.id,
        avatar: profile.photos[0].value,
      },
    });

    console.log(createdUser);
    return createdUser.save();
  }

  async findOrCreateGoogleProfile(userDTO: RegisterDTO): Promise<User> {
    const user = await this.userModel
      .findOne({ 'email':userDTO.email})
      .exec();
    if (user) {
      return user;
    }
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return createdUser;
  }

  async appendTodo(email: string, todo: Todo) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      user.todos.push(todo);
      user.save();
    }
    return;
  }

  async appendTodos(email: string, todo: any[]) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      todo.forEach(async todoItem => {
        user.todos.push(todoItem)
      });
      user.save();
    }
    return;
  }

  async deleteTodo(email: string, todoId: Number) {
    const user = await this.userModel.findOne({ email });
    if (user && todoId) {
      var removed = user.todos.find((value) => value._id == todoId).remove();
      user.save();
    }
    return removed;
  }
  async updateTodo(email: string, todo: Todo) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      await this.userModel.update({ "email": email, "todos._id": todo._id, }, {
        '$set': {
          'todos.$.title': todo.title,
          'todos.$.description': todo.description,
          'todos.$.coordinates': todo.coordinates,
          'todos.$.isCompleted': todo.isCompleted,
          'todos.$.image': todo.image
        }
      });
    }
    return;
  }

  async removeAll(email: string) {

    const user = await this.userModel.findOne({ email });
    if (user) {
      await this.userModel.update({ "email": email }, { '$set': { 'todos': [] } })
      user.save();
    }
    return;

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

  async find(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async editProfile(editUserDto: EditUserDto, email: string): Promise<User> {
    return await this.userModel.update({ "email": email }, {
      '$set': {
        'name': editUserDto.name,
        'email': editUserDto.email
      }
    });
  }
}
