  
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from 'src/user/models/user.dto';
import { UserService } from 'src/user/user.service';
import { Payload } from './interfaces/payload.interface';

@Controller('auth')
export class AuthController {

    constructor( private userService: UserService,private authService: AuthService) {

    }

    @Post('login') 
    async login(@Body() userDTO: LoginDTO)
    {
        const user = await this.userService.find(userDTO.email);
        const payload = {
          email: user.email      
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
    
      @Post('register')
      async register(@Body() userDTO: RegisterDTO) {
        const user = await this.userService.create(userDTO);
        const payload: Payload = {
          email: user.email
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
      }
}