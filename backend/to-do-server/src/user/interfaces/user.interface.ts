import { Document } from 'mongoose';

export interface User extends Document 
{
    id:number;
    name: string;
    email: string;
    password: string;
}