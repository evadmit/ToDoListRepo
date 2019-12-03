import { IsNotEmpty } from "class-validator";
import { CoordinatesDto } from "src/shared/DTOs/coordinates.dto";
import { Action } from "./common";
import { Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";

export class TodoDto {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmpty()
    readonly isCompleted: boolean;
    readonly coordinates: CoordinatesDto;
    readonly image: string;
    readonly userEmail: string;
}

export class ResponseGetAllTodosModel {
    todoList: Array<ResponseTodoGetAllTodosModelItem>;
}

export class ResponseTodoGetAllTodosModelItem {
    _id: ObjectID;
    title: string;
    description: string;
    isCompleted: boolean;
    coordinates: CoordinatesDto;
    image: string;
    userEmail: string;
}


export class RequestAddToDoModelItem {
    title: string;
    description: string;
    coordinates: CoordinatesDto;
    isCompleted: boolean;
    image: string;
    userEmail: string;
}


export class AllLocalTodosModelItem extends ResponseTodoGetAllTodosModelItem {
    isSynced: boolean;
    action: Action;
}



export class SyncNewTodosModel {
    todoList: Array<AllLocalTodosModelItem>;
}


@Entity({ name: "Todos" })
export class Todo
{
    @ObjectIdColumn()
    _id:ObjectID;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    isCompleted: boolean;

    @Column()
    coordinates: CoordinatesDto;

    @Column()
    created_at: { type: Date };

    @Column()
    image : string = null;

    @Column()
    userEmail : string;
}