import { Injectable } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';
import { timingSafeEqual } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FacebookStrategy {
  constructor( private readonly userService: UserService) {
    this.init();
  }
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: "1443087942516078",
          clientSecret: "7f30de951076ee3296b9b11b7303d0ab",
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = await this.userService.findOrCreate(profile);
          return done(null, user);
        },
      ),
    );
  }
}