import { NewToDoModel, Action, ResponseTodoGetAllTodosModelItem, ResponseTodoEditTodoModelItem } from './todo';

export class NewToDoLocalModel extends NewToDoModel{
    isSynced: boolean = true;
    action: Action = 0;
    _id: string;
}


export class AllLocalTodosModelItem extends ResponseTodoGetAllTodosModelItem{
    isSynced: boolean;
    _id: string;
}

export class EditTodoLocalModel extends ResponseTodoEditTodoModelItem{
    isSynced: boolean = true;
    action: Action = 1;
    _id: string;
    isDisplayable: boolean = true;
    /**
     *
     */
    /**
     *
     */
    constructor();
    constructor( id: string);
    constructor( id?: string) {
        super();
        if(id){
        this._id = id;
       // this.action = 3;
        this.isDisplayable = false;}
    }
}

export class DeleteTodoLocalModel extends ResponseTodoEditTodoModelItem{
    isSynced: boolean = true;
    action: Action = 2;
    _id: string;
    isDisplayable: boolean = false;
    constructor();
    constructor( id: string);
    constructor( id?: string) {
        super();
        if(id)
     {this._id = id;
     this.isDisplayable = false;}

    }
}


export class SyncNewTodosModel{
    todoList: Array<any>;
}