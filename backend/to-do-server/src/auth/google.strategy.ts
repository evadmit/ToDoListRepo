import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";

import * as googleStrategy from 'passport-google-token';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    
    constructor( private readonly authService: AuthService,)
    {
        super({
          clientID: "404588248203-f1cn5o51b10ugldo49os21kig7tijuuc.apps.googleusercontent.com",
          clientSecret: "ZXT4jRMlTFLwaxD8z4VU9zgZ",
           callbackURL : 'http://localhost:3003/auth/google/callback',
      
            passReqToCallback: true,
            scope: ['profile']
       
          })
       
    }


    async validate(accessToken: string, refreshToken: string,{ _json }, done: Function)
    {
      const { id, ...rest } = _json;
      const data = {
        ...rest,
        google_id: id,
      };
      
    const user = await this.authService.upsertGoogleUser(data);
    return done(null, user);
    }

}