import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Payload } from './interfaces/payload.interface';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}
  
    async signPayload(payload: Payload) {
      //TODO get from env
      const SECRET_KEY: string = "evadmkfforkejekkdlslo";
      return sign(payload, SECRET_KEY, { expiresIn: '7d' });
    }
  
    async validateUser(payload: Payload) {
      return await this.userService.findByPayload(payload);
    }
  }
