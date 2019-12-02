import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthStart, GoogleRedirect } from './google.middleware';

@Module({
  imports: [
    UserModule,
    AuthModule,

  ],
  providers: [AuthService, JwtStrategy, FacebookStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule { 

  configure(consumer: MiddlewareConsumer) {
    //Apply middleware for running passport on /api/auth/register route
   // consumer.apply(RegisterMiddleware).forRoutes('auth/register');
    //Apply middleware for google passport
    consumer.apply(GoogleAuthStart).forRoutes({ method: RequestMethod.GET, path: '/auth/google' });
    consumer.apply(GoogleRedirect).forRoutes('/auth/redirect');
}}
export default AuthModule;

