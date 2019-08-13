import { Controller, Get, UseGuards, Post, Body,Query, Header, Res, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserDto } from './models/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService) {}

    @Post('login')
    @UseGuards(AuthGuard())
    async loginUser(@Res() res,@Param ('email') email): Promise<User>{
        const user = await this.userService.find(email);
        return res.status(HttpStatus.OK).json({
            message: "User was found!",
            user: user  
        })
    }

    @Post('register')
    async create(@Res() res,@Body() userDto: UserDto){
        debugger;
      const createdUser= await  this.userService.create(userDto);
      return res.status(HttpStatus.OK).json({
        message: "User registered successfully!",
        user: createdUser
    })
    }

    @Get('google-login')
    @UseGuards(AuthGuard())
    async userGoogleLogin(): Promise<User[]>{
        return this.userService.findAll();
    }


}