
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDTO, LoginDTO, EditUserDto, User } from './models/user.dto';
import * as bcrypt from 'bcrypt';
import { Repository, ObjectID} from 'typeorm';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/models/todo.dto';

@Injectable()
export class UserService {

  constructor( @InjectRepository(User) private userRepository: Repository<User>) { }

  async create(userDTO: RegisterDTO) {
    const { email } = userDTO;
    const user = await this.userRepository.findOne({where: {email:email}  });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  
    let newUSer = Object.assign(new User(), userDTO);

    const createdUser = await this.saveUser(newUSer);
    return createdUser;
  }

private async saveUser(newUSer:User): Promise<User>
{
  const createdUser = await this.userRepository.save(newUSer);

  return createdUser;
}

  async findOrCreate(profile): Promise<User> {
    
    const user = await this.userRepository
      .findOne({ 'email':profile.emails[0].value });

    if (user) {
      return user;
    }
    var newUser = new User();
    newUser.password = profile.id;
    newUser.email = profile.emails[0].value,
    newUser.name = profile.name.givenName,
    newUser.facebook.avatar = profile.photos[0].value; 
    newUser.facebook.id = profile.id; 

    const createdUser = await this.saveUser(newUser);
    return createdUser;
  }

  async findOrCreateGoogleProfile(userDTO: RegisterDTO): Promise<User> {

    const user = await this.userRepository
      .findOne({ 'email':userDTO.email});
    if (user) {
      return user;
    }
    let newUSer = Object.assign(new User(), userDTO);

    const createdUser = await this.saveUser(newUSer);
    return createdUser;
  }

  async appendTodo(email: string, todo: Todo) {

    const user = await this.userRepository.findOne({where: {email:email}  });
    if (user) {
      user.todos.push(todo);
    await  this.userRepository.save(user);
    }
    return;
  }

  async appendTodos(email: string, todo: any[]) {

    const user = await this.userRepository.findOne({where: {email:email}  });
    if (user) {
      todo.forEach(async todoItem => {
        user.todos.push(todoItem)
      });
     await this.userRepository.save(user);
    }
    return;
  }

  async deleteTodo(email: string, todoId: ObjectID) {
    const user = await this.userRepository.findOne({where: {email:email}  });
    if (user && todoId) {
      var removeIdx = user.todos.findIndex(value =>( value._id.equals(todoId)));
      var removed = user.todos.find(value =>( value._id.equals(todoId)));
      user.todos.splice( removeIdx, 1 );
     await this.userRepository.save(user);
    }
    return removed;
  }

  async updateTodo(email: string, todo: Todo) {

    var user = await this.userRepository.findOne({where: {email:email}  });

    var toUpdate =  user.todos.find(value =>( value._id.equals(todo._id)));

    var idx =  user.todos.indexOf(toUpdate);
    user.todos[idx].title=todo.title;
    user.todos[idx].description=todo.description;
    user.todos[idx].coordinates=todo.coordinates;
    user.todos[idx].isCompleted=todo.isCompleted;
    user.todos[idx].image=todo.image;
    if (user) {
      await this.userRepository.save(user);
    }
    return;
  }

  async removeAll(email: string) {

    const user = await this.userRepository.findOne({where: {email:email}  });
    user.todos= new Array<Todo>();
    if (user) {
      await this.userRepository.save(user);
    }
    return;

  }

  async findByLogin(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userRepository
      .findOne({where:{ email:email, password:password }});
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
    return await this.userRepository.findOne({ email });
  }

  async find(email: string): Promise<User> {
    return await this.userRepository.findOne({ email: email });
  }

  async editProfile(editUserDto: EditUserDto, email: string): Promise<User> {

    let toUpdate = await this.userRepository.findOne({where:{email:email}});
    delete toUpdate.name;
    delete toUpdate.email;
    let updated = Object.assign(toUpdate, editUserDto);

    
    return await this.userRepository.save(updated);
  }
}
