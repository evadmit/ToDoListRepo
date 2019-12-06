import { NewToDoModel, Action, ResponseTodoGetAllTodosModelItem, ResponseTodoEditTodoModelItem } from './todo';

export class NewToDoLocalModel extends NewToDoModel{
    isSynced = true;
    action = 0;
    _id;
}


export class AllLocalTodosModelItem extends ResponseTodoGetAllTodosModelItem{
    isSynced;
    _id;
}

export class EditTodoLocalModel extends ResponseTodoEditTodoModelItem{
    isSynced = true;
    action = 1;
    _id;
    isDisplayable = true;
    constructor();
    constructor( id) {
        super();
        if(id){
        this._id = id;
        this.isDisplayable = false;}
    }
}
export class EditTodoStatusLocalModel extends ResponseTodoEditTodoModelItem{
    isSynced = true;
    action = 1;
    _id;
    isDisplayable = true;
    constructor();
    constructor( id) {
        super();
        if(id){
        this._id = id;}
    }
}

export class DeleteTodoLocalModel extends ResponseTodoEditTodoModelItem{
    isSynced = true;
    action = 2;
    _id;
    isDisplayable = false;
    constructor();
    constructor( id) {
        super();
        if(id)
     {this._id = id;
     this.isDisplayable = false;}

    }
}


export class SyncNewTodosModel{
    todoList;
}