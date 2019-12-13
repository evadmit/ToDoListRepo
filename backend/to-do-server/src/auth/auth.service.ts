import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Payload } from './interfaces/payload.interface';
import { sign } from 'jsonwebtoken';

import { GoogleProfile } from './interfaces/oauth-provider.interface';
import { User } from 'src/user/interfaces/user.interface';
import { AuthPayload } from './interfaces/auth-payload.interface';

export enum Provider
{
    GOOGLE = 'google'
}
@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async signPayload(payload: Payload): Promise<string> {
    const SECRET_KEY: string = "evadmkfforkejekkdlslo";
    return sign(payload, SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }

  async createAuthPayload(user: User): Promise<AuthPayload> {

    return {
      token: await this.signPayload({ email: user.email }),
      user,     
    };
  }
  async upsertGoogleUser(data: User) {
    const user = await this.userService.findOrCreate(data);

    return user;
  }
  
}
