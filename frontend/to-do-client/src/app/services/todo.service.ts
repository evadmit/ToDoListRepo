import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewToDoModel, NewToDoResponseModel, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, ResponseTodoEditTodoModelItem, ResponseUpdateStatusTodoModel } from '../models/todo';
import { AuthService } from './auth.service';
import { EDIT_TODO_URL, ADD_TODO_URL, GET_TODOS_URL, DELETE_TODO_URL, CHANGE_TODO_STATUS_URL} from 'src/environments/environment';
import { Events } from '@ionic/angular';
import { SqliteService } from './sqlite.service';
import { NewToDoLocalModel, EditTodoLocalModel, DeleteTodoLocalModel, EditTodoStatusLocalModel } from '../models/local-todos';
declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,private authService: AuthService,public events: Events, private sqlService: SqliteService)   
    { }


async addTodo(todo:NewToDoModel): Promise<boolean>{

  await this.tryToSync();

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
    return false;
  }

 let newLocalTodo = new NewToDoLocalModel();
 newLocalTodo = todo as NewToDoLocalModel;
 newLocalTodo.isSynced = true;
 newLocalTodo.action = 0;

try {
 var res = await this.http.post<NewToDoResponseModel>(ADD_TODO_URL,{
    title : todo.title,
    description : todo.description,
    coordinates : todo.coordinates,
    isCompleted : todo.isCompleted,
    image : todo.image

    }).toPromise();  
    
    newLocalTodo._id = res._id;

}
catch(ex){
  console.log("trying to do local",ex);
  newLocalTodo.isSynced = false;
  var ObjectID = require("bson-objectid");
  
  newLocalTodo._id = ObjectID.generate();
  console.log("trying to do local",newLocalTodo);
  }

  this.sqlService.addTodo(newLocalTodo);
  console.log("local: ", newLocalTodo); 
return true;

}

async editTodo(todo:ResponseTodoEditTodoModelItem):Promise<boolean>
{
  
  await this.tryToSync();

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }

  var newLocalTodo = new EditTodoLocalModel();
      newLocalTodo._id = todo._id;
      newLocalTodo.description =  todo.description;
      newLocalTodo.image =  todo.image;
      newLocalTodo.isCompleted =  todo.isCompleted;
      newLocalTodo.title =  todo.title;
      newLocalTodo.coordinates =  todo.coordinates;

  try
  {
   await this.http.post<ResponseTodoEditTodoModelItem>(EDIT_TODO_URL+todo._id,todo).toPromise();
  } 
  
  catch(ex)
  {
    newLocalTodo.isSynced = false;
    newLocalTodo.action = 1;
    console.log("trying to update local",newLocalTodo);
  }

  await this.sqlService.editTodo(newLocalTodo);
  return true;
}

async getToDoList(): Promise<Array<ResponseTodoGetAllTodosModelItem>>{

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
    return null;
  }

  try{
   var res = await this.http.get<ResponseGetAllTodosModel>(GET_TODOS_URL).toPromise();
   return res.todoList;
  }
 
  catch(ex){
  console.log("trying to get local",ex);
  var localTodos = this.sqlService.getAllLocal();
  return localTodos;
  }
  
}

async deleteToDo(todoId:string) {

  await this.tryToSync();

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }

  var newLocalTodo = new DeleteTodoLocalModel();
  newLocalTodo._id = todoId;
  
  try
  {
   await this.http.delete<ResponseGetAllTodosModel>(DELETE_TODO_URL+todoId).toPromise();
  }
 
catch(ex){
  console.log("trying to do local",ex);
  
   var todoToUpdateStatus = new DeleteTodoLocalModel(todoId);
   todoToUpdateStatus.isSynced = false;
   todoToUpdateStatus.action = 2;
   this.sqlService.deleteTodo(todoId);
   this.sqlService.saveDeletedTodo(todoToUpdateStatus);
 }

 this.sqlService.deleteTodo(todoId);
}

async updateStatus(item: ResponseTodoGetAllTodosModelItem) {
 
  await this.tryToSync();
 
  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }
  var todoToUpdateStatus = new EditTodoStatusLocalModel(item._id);

  try
  {
    await this.http.post<ResponseUpdateStatusTodoModel>(CHANGE_TODO_STATUS_URL+ item._id,null).toPromise();
  
    todoToUpdateStatus.action = 1;
    todoToUpdateStatus.isSynced = true;
    todoToUpdateStatus.isDisplayable = true;
  }
  
  catch(ex)
  {
    console.log("trying to do local",ex);

    todoToUpdateStatus.action = 1;
    todoToUpdateStatus.isSynced = false;
    todoToUpdateStatus.isDisplayable = true;
  } 

  this.sqlService.updateTodoStatus(todoToUpdateStatus);
}

async tryToSync(){

  console.log("trying to sync ");
  try 
  { 
    await this.sqlService.fullTodoSync();
  }

  catch (ex)
  {
    console.log("sync error", ex);
  }


}

}