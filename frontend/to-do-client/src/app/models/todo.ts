export class NewToDoModel{
    title: string;
    description: string;
    coordinates: Coordinates;
}

export class NewToDoResponseModel{
    title: string;
    description: string;
    coordinates: Coordinates;
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

export class ResponseTodoGetAllTodosModelItem{
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    coordinates : Coordinates;
}


export class ResponseTodoEditTodoModelItem{
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    coordinates : Coordinates;
}