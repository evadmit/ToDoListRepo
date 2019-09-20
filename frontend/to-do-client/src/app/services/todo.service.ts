import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewToDoModel, NewToDoResponseModel, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, ResponseTodoEditTodoModelItem } from '../models/todo';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import config from '../config/config';
import { Storage } from  '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private storage: Storage,private http: HttpClient,private authService: AuthService ) { }


async addTodo(todo:NewToDoModel): Promise<boolean>{
  
  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  return false;
  }
  var token =  await this.storage.get("ACCESS_TOKEN")

  var httpHeaders = new HttpHeaders({'Authorization':'Bearer '+token ,'Content-Type':'application/json' });
  
 var res = await this.http.post<NewToDoResponseModel>('http://localhost:3003/todo/add-todo/',{
    title : todo.title,
    description : todo.description,
    coordinates : todo.coordinates
},{headers:httpHeaders}).toPromise();

 if(!res){
  console.log("res: ", res);
    return false;
  }
  if (res) {
    console.log("added: ", res);
    
  }
  
return true;

}
async editTodo(todo:ResponseTodoEditTodoModelItem):Promise<boolean>
{
  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }
  var token =  await this.storage.get("ACCESS_TOKEN")

  var httpHeaders = new HttpHeaders({'Authorization':'Bearer '+token ,'Content-Type':'application/json' });
  
  var res = await this.http.post<ResponseTodoEditTodoModelItem>('http://localhost:3003/todo/edit?todoID='+todo._id,todo,{headers:httpHeaders}).toPromise();
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
  var token =  await this.storage.get("ACCESS_TOKEN")

  var httpHeaders = new HttpHeaders({'Authorization':'Bearer '+token ,'Content-Type':'application/json' });
  
  var res = await this.http.get<ResponseGetAllTodosModel>('http://localhost:3003/todo/todos/',{headers:httpHeaders}).toPromise();
  return res.todoList;
}

 async deleteToDo(todoId:string) {

  if(!this.authService.isAuthenticated())
  {
    console.log("auth error");
  }
  var token =  await this.storage.get("ACCESS_TOKEN")

  var httpHeaders = new HttpHeaders({'Authorization':'Bearer '+token ,'Content-Type':'application/json' });
  
  var res = await this.http.delete<ResponseGetAllTodosModel>('http://localhost:3003/todo/delete?todoID='+todoId,{headers:httpHeaders}).toPromise();
  console.log(res);
}
}