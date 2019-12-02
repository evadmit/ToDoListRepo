import { IsEmail, IsNotEmpty, Allow } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @Allow()
    readonly password: string;
}

export class EditUserDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export class RegisterDTO {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @Allow()
    password: string;
}