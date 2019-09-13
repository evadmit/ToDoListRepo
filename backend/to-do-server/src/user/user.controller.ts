import { Controller, Get, UseGuards, Post, Body,Query, Header, Res, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserDto } from './models/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService) {}





}