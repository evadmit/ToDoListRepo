import { Injectable } from '@angular/core';
import{SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx'
import { NewToDoModel, ResponseTodoEditTodoModelItem, Action } from '../models/todo';
import { EditTodoLocalModel, NewToDoLocalModel } from '../models/local-todos';
import { TodoService } from './todo.service';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  databaseObj: SQLiteObject;
  row_data: any = [];
  constructor(private sqlite: SQLite, private todoService : TodoService) { 
    this.createDatabase();
  }

createDatabase()
{
 
  this.sqlite.create({
name: 'sync.db',
location: 'default'
  })
  .then((db: SQLiteObject) => {

    db.executeSql('create table Todos(_id TEXT PRIMARY KEY,  title TEXT, description TEXT, coordinates TEXT, isCompleted NUMERIC, created_at NUMERIC, isSynced NUMERIC, action NUMERIC)')
    .then(() => console.log('Execute SQL'))
    .catch(e => console.log(e));

    this.databaseObj = db;
  })
  .catch(e => console.log(e));
}

addTodo (todo: NewToDoLocalModel){
  var sqlQuery = " insert into Todos (title, description, coordinates, isCompleted, isSynced, action) values (?,?,?,?,?,?) ";
  var values = [todo.title, todo.description, todo.coordinates, todo.isCompleted, todo.isSynced, Action.add];
  this.databaseObj.executeSql(sqlQuery, values);
}

deleteTodo(todoId:string){
  this.databaseObj.executeSql(" delete from Todos where _id = "+ todoId, [])
  .catch(e => {
    alert("error " + JSON.stringify(e))
  });

}

editTodo(todo: EditTodoLocalModel){
var sqlQuery = "Update Todos set (decsripton) = (?) where _id = ? ;";
var values = [todo.description||null, todo._id];
this.databaseObj.executeSql(sqlQuery, values);
}

fullTodoSync(){
  this.databaseObj.executeSql("select * from Todos where isSynced = 0")
  .then((res) => {
    this.row_data =[];
    if(res.rows.length>0){
      for(var i = 0 ; i< res.rows.length; i++){
        this.row_data.push(res.rows.item(i));
      }
    }
  var syncRes =  this.todoService.syncTodos(this.row_data);
  if(syncRes){
    this.cleanSynced();
  }
  })
  .catch(e=>{
    console.log(JSON.stringify(e))
  });

}

cleanSynced(){
  this.databaseObj.executeSql("update  Todos set isSynced = 1 where isSynced = 0")
}
  
}
