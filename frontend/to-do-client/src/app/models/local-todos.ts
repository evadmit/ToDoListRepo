import { NewToDoModel, Action, ResponseTodoGetAllTodosModelItem, ResponseTodoEditTodoModelItem } from './todo';

export class NewToDoLocalModel extends NewToDoModel{
    isSynced: boolean = true;
    action: Action = 0;
}


export class AllLocalTodosModelItem extends ResponseTodoGetAllTodosModelItem{
    isSynced: boolean;
    action : Action;
}

export class EditTodoLocalModel extends ResponseTodoEditTodoModelItem{
    isSynced: boolean = true;
    action: Action = 1
}


export class SendNewTodosModel{
    todoList: Array<AllLocalTodosModelItem>;
}