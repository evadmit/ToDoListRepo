import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewToDoModel, NewToDoResponseModel, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, ResponseTodoEditTodoModelItem, ResponseUpdateStatusTodoModel } from '../models/todo';
import { AuthService } from './auth.service';
import { Storage } from  '@ionic/storage';
import { EDIT_TODO_URL, ADD_TODO_URL, GET_TODOS_URL, DELETE_TODO_URL, CHANGE_TODO_STATUS_URL } from 'src/environments/environment';
import { Events } from '@ionic/angular';
import { NetworkService } from './network.service';
import { SqliteService } from './sqlite.service';
import { SendNewTodosModel, NewToDoLocalModel } from '../models/local-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,private authService: AuthService,public events: Events, private networkService: NetworkService ) { }


async addTodo(todo:NewToDoModel): Promise<boolean>{
  
  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  return false;
  }

 let newLocalTodo = new NewToDoLocalModel();
 newLocalTodo.description =  todo.description;
 newLocalTodo.image =  todo.image;
 newLocalTodo.isCompleted =  todo.isCompleted;
 newLocalTodo.title =  todo.title;
 newLocalTodo.coordinates =  todo.coordinates;

 var res = await this.http.post<NewToDoResponseModel>(ADD_TODO_URL,{
    title : todo.title,
    description : todo.description,
    coordinates : todo.coordinates,
    isCompleted : todo.isCompleted,
    image : todo.image
}).toPromise();

 if(!res){
  newLocalTodo.isSynced = false;
  //this.sqlService.addTodo(newLocalTodo);
    return false;
  }
  if (res) {
   // this.sqlService.addTodo(newLocalTodo);
    
  } 
  console.log("local: ", newLocalTodo); 
return true;

}

async editTodo(todo:ResponseTodoEditTodoModelItem):Promise<boolean>
{
  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }

  //this.sqlService.editTodo(todo);

  var res = await this.http.post<ResponseTodoEditTodoModelItem>(EDIT_TODO_URL+todo._id,todo).toPromise();
  console.log(res);
  if(!res){
    return false;
  }
  return true;
}

async getToDoList(): Promise<Array<ResponseTodoGetAllTodosModelItem>>{

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
    return null;
  }

  var res = await this.http.get<ResponseGetAllTodosModel>(GET_TODOS_URL).toPromise();
  return res.todoList;
}

 async deleteToDo(todoId:string) {

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }

  var res = await this.http.delete<ResponseGetAllTodosModel>(DELETE_TODO_URL+todoId).toPromise();
  console.log(res);
}

async updateStatus(todoId:string) {

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }

  var res = await this.http.post<ResponseUpdateStatusTodoModel>(CHANGE_TODO_STATUS_URL+todoId,null).toPromise();
  console.log(res);
}

async syncTodos (todos : SendNewTodosModel):Promise<boolean>{
  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }

  var res = await this.http.post<SendNewTodosModel>(CHANGE_TODO_STATUS_URL,null).toPromise();
  console.log(res);
  if(!res){
    return false;
  }
  return true;
}
}