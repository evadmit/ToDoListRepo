import { Injectable } from '@angular/core';
import{SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx'
import { NewToDoModel, ResponseTodoEditTodoModelItem, Action, ResponseGetAllTodosModel, ResponseTodoGetAllTodosModelItem, Coordinates } from '../models/todo';
import { EditTodoLocalModel, NewToDoLocalModel, AllLocalTodosModelItem, SyncNewTodosModel } from '../models/local-todos';
import { TodoService } from './todo.service';
import { SyncService } from './sync.service';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  databaseObj: SQLiteObject;
  row_data: any = [];
  constructor(private sqlite: SQLite, private syncService : SyncService) { 
    this.createDatabase();
  }

createDatabase()
{
 
  this.sqlite.create({
name: 'sync.db',
location: 'default'
  })
  .then((db: SQLiteObject) => {

    this.databaseObj = db;
    this.createTables();
  })
  .catch(
    e => {console.log(e);
    alert("error in creating db " + JSON.stringify(e));}    
    );
}

async createTables(){
  try {
      await this.databaseObj.executeSql('create table  if not EXISTS Todos(_id TEXT PRIMARY KEY,  title TEXT, description TEXT, isCompleted INTEGER , isSynced INTEGER , isDisplayable INTEGER, action INTEGER , image TEXT)', []);
     }catch(e){
      console.log("Error in creating Todos table !" + JSON.stringify(e));
  }

  try {
   await this.databaseObj.executeSql('create table  if not EXISTS Coordinates(id INTEGER  PRIMARY KEY AUTOINCREMENT,  latitude REAL , longitude REAL,  todo_id TEXT, FOREIGN KEY(todo_id) REFERENCES Todos(_id) ON DELETE CASCADE)', [])
 }catch(e){
    console.log("Error in creating Coordinates table !" + JSON.stringify(e));
}
}


addTodo (todo: NewToDoLocalModel){
  console.log('Execute addTodo', todo)
  var sqlQuery = " insert into Todos ( _id, title, description, isCompleted, isSynced, isDisplayable, action, image) values (?,?,?,?,?,?,?, NULL)" ;
  var values = [todo._id, todo.title, todo.description, todo.isCompleted? 1 : 0, todo.isSynced? 1 : 0,todo.isDisplayable? 1 : 0, Action.add];

  
 this.databaseObj.executeSql(sqlQuery,values) 
 .then(() => console.log('Execute addTodo'))
 .catch(e => {
   alert("error add todo" + JSON.stringify(e));});

   var sqlQueryCoordinates = "insert into Coordinates (latitude , longitude, todo_id) values (?,?,?)" ;
   var valuesForCoordinates = [todo.coordinates.latitude, todo.coordinates.longitude, todo._id];
  this.databaseObj.executeSql(sqlQueryCoordinates,valuesForCoordinates) 
  .then(() => console.log('Execute addCoordinate'))
  .catch(e => {
    alert("error add coordinates " + JSON.stringify(e));});

}

deleteTodo(todoId:string){

  this.databaseObj.executeSql(" delete from Todos where _id =?",[todoId])
  .then(() => console.log('Execute deleteTodo'))
 .catch(e => {
   alert("error deleteTodo" + JSON.stringify(e));
   console.log(e)});
  

}

editTodo(todo: EditTodoLocalModel){
var sqlQuery = "Update Todos set description = ? , image = ? , isDisplayable = ? where _id LIKE ?;";
console.log(sqlQuery);
var values = [todo.description||null, todo.image.toString(),todo.isDisplayable? 1 : 0, todo._id];
this.databaseObj.executeSql(sqlQuery, values) 
.then(() => console.log('Execute editTodo'))
.catch(e => {
  alert("error editTodo" + JSON.stringify(e));
  console.log(e)});
}

updateTodoStatus(todoId:string){
  this.databaseObj.executeSql(" update  Todos set IsCompleted = NOT IsCompleted where _id=?",[todoId])
  .catch(e => {
    alert("error updateTodoStatus" + JSON.stringify(e))
  });

}

fullTodoSync()

{
  this.databaseObj.executeSql("select * from Todos where isSynced = 0",[])
  .then((res) => {
    this.row_data =[];
    if(res.rows.length>0){
      for(var i = 0 ; i< res.rows.length; i++){
        this.row_data.push(res.rows.item(i));
      }}
    });

  var  todosToSynk = new SyncNewTodosModel();
  todosToSynk.todoList = this.row_data;

  this.databaseObj.executeSql("select * from Coordinates",[])
  .then((coordinatesRes) => {
    this.row_data =[];
    if(coordinatesRes.rows.length>0){
      for(var i = 0 ; i< coordinatesRes.rows.length; i++){
        this.row_data.push(coordinatesRes.rows.item(i));
      }
    }});

var coordinates = Array<Coordinates>();
coordinates = this.row_data;

todosToSynk.todoList.forEach(td => td.Coordinates = (coordinates.find(cd => cd.todo_id == td._id)));

  var syncRes =  this.syncService.syncTodos(todosToSynk);

  if(syncRes){
    this.cleanSynced();
  }

}

async getAllLocal(): Promise<Array<ResponseTodoGetAllTodosModelItem>>{


  var todos = new Array<ResponseTodoGetAllTodosModelItem>() ;
  this.databaseObj.executeSql("select * from Todos ",[])
  .then((res) => {
    
  console.log("sqlite rows",res);
    if(res.rows.length>0){
      for(var i = 0 ; i< res.rows.length; i++){
        todos.push(res.rows.item(i));
      }
    }
    
}).catch(e => {
  console.log(e);
  alert("cant get all  " + JSON.stringify(e));
});

var coordinates= new Array<Coordinates>()  ;
this.databaseObj.executeSql("select * from Coordinates ",[])
.then((res) => {
  
console.log("Coordinates rows",res);
  if(res.rows.length>0){
    for(var i = 0 ; i< res.rows.length; i++){
      coordinates.push(res.rows.item(i));
    }
  }
  
}).catch(e => {
console.log(e);
alert("cant get all  " + JSON.stringify(e));
});

console.log("local todos", todos);
console.log("local coordinates", coordinates);
todos.forEach(td => td.coordinates = (coordinates.find(cd => cd.todo_id == td._id)));

return todos;
}

cleanSynced(){
  this.databaseObj.executeSql("update  Todos set (isSynced) = 1 where isSynced = 0", []);
  this.databaseObj.executeSql("delete from  Todos  where isDisplayable = 0", []);

}
  
}
