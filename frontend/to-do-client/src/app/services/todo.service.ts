import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewToDoModel, NewToDoResponseModel, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, ResponseTodoEditTodoModelItem, ResponseUpdateStatusTodoModel } from '../models/todo';
import { AuthService } from './auth.service';
import { Storage } from  '@ionic/storage';
import { EDIT_TODO_URL, ADD_TODO_URL, GET_TODOS_URL, DELETE_TODO_URL, CHANGE_TODO_STATUS_URL, SYNC_TODOS_URL } from 'src/environments/environment';
import { Events } from '@ionic/angular';
import { NetworkService } from './network.service';
import { SqliteService } from './sqlite.service';
import { SyncNewTodosModel, NewToDoLocalModel, EditTodoLocalModel, DeleteTodoLocalModel } from '../models/local-todos';
declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,private authService: AuthService,public events: Events, private networkService: NetworkService
 , private sqlService: SqliteService
    ) { }


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
    console.log("new local todo ", newLocalTodo);

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
 newLocalTodo.description =  todo.description;
 newLocalTodo.image =  todo.image;
 newLocalTodo.isCompleted =  todo.isCompleted;
 newLocalTodo.title =  todo.title;
 newLocalTodo.coordinates =  todo.coordinates;
  try{
    await this.http.post<ResponseTodoEditTodoModelItem>(EDIT_TODO_URL+todo._id,todo).toPromise();
  } 
  
  catch(ex){
    console.log("trying to do local",ex);
    newLocalTodo.isSynced = false;
   newLocalTodo.action = 1;
  }
  this.sqlService.editTodo(newLocalTodo);
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
  console.log("trying to do local",ex);
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
try{
   var res = await this.http.delete<ResponseGetAllTodosModel>(DELETE_TODO_URL+todoId).toPromise();
}
 
catch(ex){
  console.log("trying to do local",ex);
   newLocalTodo.isSynced = false;
   newLocalTodo.action = 2;
   var todoToUpdateStatus = new DeleteTodoLocalModel(todoId);
   this.sqlService.addTodo(todoToUpdateStatus);
 }
 this.sqlService.deleteTodo(todoId);

  console.log(res);
}

async updateStatus(item: ResponseTodoGetAllTodosModelItem) {
 
  await this.tryToSync();
 
  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }
  try{
    var res = await this.http.post<ResponseUpdateStatusTodoModel>(CHANGE_TODO_STATUS_URL+ item._id,null).toPromise();
  }
  
  catch(ex){
    console.log("trying to do local",ex);
    var todoToUpdateStatus = new EditTodoLocalModel(item._id);
    todoToUpdateStatus.action = 1;
    todoToUpdateStatus.isSynced = false;
    this.sqlService.editTodo(todoToUpdateStatus);
} 
  this.sqlService.updateTodoStatus(item._id);
  console.log(res);
}

async tryToSync(){

if(this.networkService.getNetworkStatus()){
  console.log("network ", this.networkService.getNetworkStatus());
  this.sqlService.fullTodoSync();

}
}

}