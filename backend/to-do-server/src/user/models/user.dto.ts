import { IsEmail, IsNotEmpty, Allow } from "class-validator";
import { Entity, ObjectIdColumn, Column } from "typeorm";
import { Facebook } from "../interfaces/user.interface";
import { Todo } from "src/todo/models/todo.dto";

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

@Entity({ name: "Users" })
export class User 
{
    @ObjectIdColumn()
    _id:number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;  

    @Column()
    image: { data: Buffer, contentType: String } = null ;

    @Column()
    todos : Todo[] = new Array<Todo>();
    
    @Column()
    facebook: Facebook;
}
