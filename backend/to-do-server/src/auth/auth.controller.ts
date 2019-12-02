
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from 'src/user/models/user.dto';
import { UserService } from 'src/user/user.service';
import { Payload } from './interfaces/payload.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(private userService: UserService, private authService: AuthService) {

  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      email: user.email
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    console.log("login");
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      email: user.email
    };
    const token = await this.authService.signPayload(payload);
    console.log(token);
    return { user, token };
  }

  @UseGuards(AuthGuard('facebook-token'))
  @Get('login-facebook')
  async getTokenAfterFacebookSignIn(@Req() req) {
    var user = req.user;
    console.log("getTokenAfterFacebookSignIn",req.user);
     const payload = {
       email: req.user.email
     };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('google')
  async googleLogin(@Body() userDTO: RegisterDTO)
  {
    console.log("google login");
    const user = await this.userService.findOrCreateGoogleProfile(userDTO);
    const payload: Payload = {
      email: user.email
    };
    const token = await this.authService.signPayload(payload);
    console.log(token);
    return { user, token };
  }
}