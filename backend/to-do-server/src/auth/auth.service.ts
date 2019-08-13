import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService
      ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.find(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id  };
    return {
      access_token: this.jwtService.sign(payload),
    };
}
}