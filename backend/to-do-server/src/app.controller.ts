import { Controller, Get, UseGuards, Post,Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserLoginDto } from './shared/DTOs/userLogin.dto';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // {		"username": "evadmit@gmail.com", "password": "Qwe123!"} example
 

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: UserLoginDto) {
     const token = this.authService.login(user);
     return token;
  }
}
