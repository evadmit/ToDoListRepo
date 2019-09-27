import { Controller, Get, UseGuards, Post, Body,Query, Header, Res, HttpStatus, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserDto, EditUserDto } from './models/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/shared/user.decorator';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService) {}

    @Post('edit')
    @UseGuards(AuthGuard('jwt'))
    async editTodo(@Res() res, @Body() editUserDto:EditUserDto ,@UserDecorator() user){
  
      const editedProfile= await this.userService.editProfile(editUserDto,(user as User).email);
      return editedProfile;
  
    }
}