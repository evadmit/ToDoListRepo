import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './interfaces/user.interface';
import {UserDto} from './models/user.dto';

@Injectable()
export class UserService {
    private readonly users: User[];

constructor(@InjectModel('User')private userModel:Model<User>) {}
   
async create( userDto: UserDto):Promise<User>{
        const createdUser = await new this.userModel(userDto);
        return  createdUser.save();
    console.log("Work")
    }

async findAll(): Promise<User[]>{
    return await this.userModel.find().exec();
}


async find( email:string): Promise<User>
    {
return await this.userModel.findOne({email: email});
    }  
}
