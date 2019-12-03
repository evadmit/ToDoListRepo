import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.dto';

@Module({
  imports: [  
    TypeOrmModule.forFeature([User]) ,
    PassportModule.register({ defaultStrategy: 'jwt', session: true, property: 'user' }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
