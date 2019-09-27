import { IsNotEmpty } from "class-validator";
import { CoordinatesDto } from "src/shared/DTOs/coordinates.dto";
import { ObjectID } from "mongodb";

export class TodoDto{
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string; 
    @IsNotEmpty()
    readonly user_id: number;
    readonly isCompleted: boolean;
    readonly coordinates : CoordinatesDto;
    readonly image : string;
    }

    export class ResponseGetAllTodosModel{
        todoList: Array<ResponseTodoGetAllTodosModelItem>;
    }
    
    export class ResponseTodoGetAllTodosModelItem{
        _id: ObjectID;
        title: string;
        description: string;
        user_id: number;
        isCompleted: boolean;
        coordinates : CoordinatesDto;
        image : string;
    }


    export class RequestAddToDoModelItem {
            title:string;
            description: string;
            coordinates : CoordinatesDto;
            isCompleted: boolean;
            image : string;
    }