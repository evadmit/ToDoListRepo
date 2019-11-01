
export class NewToDoModel{
    title: string;
    description: string;
    coordinates: Coordinates;
    isCompleted: boolean = false;
    image:string;
}

export class NewToDoResponseModel{
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
