import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Payload } from './interfaces/payload.interface';
import { sign } from 'jsonwebtoken';

import { GoogleProfile } from './interfaces/oauth-provider.interface';
import { User } from 'src/user/interfaces/user.interface';
import { AuthPayload } from './interfaces/auth-payload.interface';
@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}
  
    async signPayload(payload: Payload):Promise<string> {
      //TODO get from env
      const SECRET_KEY: string = "evadmkfforkejekkdlslo";
      return sign(payload, SECRET_KEY, { expiresIn: '7d' });
    }
  
    async validateUser(payload: Payload) {
      return await this.userService.findByPayload(payload);
    }

    async validateGoogleOAuthLogin(profile: GoogleProfile): Promise<AuthPayload> {
      const email = profile.emails[0].value;
      let user = await this.userService.find(email);
  
      if (!user) {
        user = await this.userService.create({
          email,
          name : profile.displayName,
          password: Math.random().toString(36),
        });
      }
  
      return this.createAuthPayload(user);
    }
    async createAuthPayload(user: User): Promise<AuthPayload> {
    
      return {
        token:await this.signPayload({ email: user.email}),
        user,
      };
    }
  }
