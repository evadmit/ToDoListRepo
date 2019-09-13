import { IsNotEmpty } from "class-validator";
import { CoordinatesDto } from "src/shared/DTOs/coordinates.dto";

export class TodoDto{
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string; 
    @IsNotEmpty()
    readonly user_id: number;
    readonly isCompleted: boolean;
    readonly coordinates : CoordinatesDto;
    }

    export class ResponseGetAllTodosModel{
        todoList: Array<ResponseTodoGetAllTodosModelItem>;
    }
    
    export class ResponseTodoGetAllTodosModelItem{
        title: string;
        description: string;
        user_id: number;
        isCompleted: boolean;
        coordinates : CoordinatesDto;
    }