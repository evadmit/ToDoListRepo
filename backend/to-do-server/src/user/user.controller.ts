import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserDto } from './models/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService) {}

    @Get('login')
    @UseGuards(AuthGuard())
    async loginUser(): Promise<User>{
        return this.userService.find(2);
    }

    @Post('register')
    async create(@Body() userDto: UserDto){
        this.userService.create(userDto);
    }

    @Get('google-login')
    @UseGuards(AuthGuard())
    async userGoogleLogin(): Promise<User[]>{
        return this.userService.findAll();
    }


}