  
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from 'src/user/models/user.dto';
import { UserService } from 'src/user/user.service';
import { Payload } from './interfaces/payload.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor( private userService: UserService,private authService: AuthService) {

    }

    @Post('login') 
    async login(@Body() userDTO: LoginDTO)
    {
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
        return { user, token };
      }

      @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        const token = req.user.token;
        if (token) {
         console.log("success");
        } else {
          console.log("error");    
        }
    }
}