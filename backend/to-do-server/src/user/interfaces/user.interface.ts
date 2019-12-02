import { Document } from 'mongoose';
import { Todo } from 'src/todo/intrfaces/todo.interface';

export interface User extends Document 
{
    _id:number;
    name: string;
    email: string;
    password: string;  
    image: { data: Buffer, contentType: String };
    todos : Todo[];
    facebook: Facebook;
}

export interface Facebook{
    id: string;
    avatar: { data: Buffer, contentType: String };
}

