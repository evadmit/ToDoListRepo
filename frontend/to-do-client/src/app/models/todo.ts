import { ignoreElements } from 'rxjs/operators';

export class NewToDoModel{
    title: string;
    description: string;
    coordinates: Coordinates;
    isCompleted: boolean = false;
    isDisplayable: boolean = true;
    image:string;
}

export class NewToDoResponseModel{
    _id: string;
    title: string;
    description: string;
    coordinates: Coordinates;
    image:string;
}

export class Coordinates{
    constructor (_longitude:number, _latitude: number, ){
        this.latitude=_latitude;
        this.longitude=_longitude;
    } 
    longitude: number;
    latitude: number;
    
    todo_id: string;
   
}

export class ResponseGetAllTodosModel{
    todoList: Array<ResponseTodoGetAllTodosModelItem>;
}

export class ResponseUpdateStatusTodoModel{
    message: string;
    todo:ResponseTodoGetAllTodosModelItem;
}


export class ResponseTodoGetAllTodosModelItem{
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    coordinates : Coordinates;
    image:string;
}



export class ResponseTodoEditTodoModelItem{
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    coordinates : Coordinates;
    image:string;
}


export enum Action {
    add = 0,
    update = 1,
    delete = 2
    }
