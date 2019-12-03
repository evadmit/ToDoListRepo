import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'
import { Action, ResponseTodoGetAllTodosModelItem, Coordinates } from '../models/todo';
import { EditTodoLocalModel, NewToDoLocalModel, SyncNewTodosModel, EditTodoStatusLocalModel, DeleteTodoLocalModel } from '../models/local-todos';
import { SyncService } from './sync.service';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  databaseObj: SQLiteObject;
  private row_data: any = [];
  constructor(private sqlite: SQLite, private syncService: SyncService) {
    this.createDatabase();
  }

  private createDatabase() {
    this.sqlite.create({
      name: 'sync.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.createTables();
      })
      .catch(
        e => {
          console.log(e);
          alert("error in creating db " + JSON.stringify(e));
        }
      );
  }

  private async createTables() {

    try {
      await this.databaseObj.executeSql('create table  if not EXISTS Todos(_id TEXT PRIMARY KEY,  title TEXT, description TEXT, isCompleted INTEGER , isSynced INTEGER , isDisplayable INTEGER, action INTEGER , image TEXT)', []);
    }

    catch (e) {
      console.log("Error in creating Todos table !" + JSON.stringify(e));
    }

    try {
      await this.databaseObj.executeSql('create table  if not EXISTS Coordinates(id INTEGER  PRIMARY KEY AUTOINCREMENT,  latitude REAL , longitude REAL,  todo_id TEXT, FOREIGN KEY(todo_id) REFERENCES Todos(_id) ON DELETE CASCADE)', [])
    }
    catch (e) {
      console.log("Error in creating Coordinates table !" + JSON.stringify(e));
    }
  }

  addOrReplace(todo: ResponseTodoGetAllTodosModelItem) {
    console.log('Execute add or replace Todo', todo)
    var sqlQuery = " insert or replace into Todos ( _id, title, description, isCompleted, image, isSynced, isDisplayable, action) values (?,?,?,?,?,1,1,0)";
    var values = [todo._id, todo.title, todo.description, todo.isCompleted ? 1 : 0, todo.image];


    this.databaseObj.executeSql(sqlQuery, values)
      .catch(e => {
        alert("error add todo" + JSON.stringify(e));
      });

    var sqlQueryCoordinates = "insert into Coordinates (latitude , longitude, todo_id) values (?,?,?)";
    var valuesForCoordinates = [todo.coordinates?todo.coordinates.latitude: 0.00, todo.coordinates?todo.coordinates.longitude: 0.00, todo._id];

    this.databaseObj.executeSql(sqlQueryCoordinates, valuesForCoordinates)
      .catch(e => {
        alert("error add coordinates " + JSON.stringify(e));
      });
  }

  addTodo(todo: NewToDoLocalModel) {


    var sqlQuery = " insert into Todos ( _id, title, description, isCompleted, isSynced, isDisplayable, action, image) values (?,?,?,?,?,?,?, NULL)";
    var values = [todo._id, todo.title, todo.description, todo.isCompleted ? 1 : 0, todo.isSynced ? 1 : 0, todo.isDisplayable ? 1 : 0, Action.add];


    this.databaseObj.executeSql(sqlQuery, values)
      .catch(e => {
        alert("error add todo" + JSON.stringify(e));
      });

    var sqlQueryCoordinates = "insert into Coordinates (latitude , longitude, todo_id) values (?,?,?)";
    var valuesForCoordinates = [todo.coordinates?todo.coordinates.latitude: 0.00, todo.coordinates?todo.coordinates.longitude: 0.00, todo._id];

    this.databaseObj.executeSql(sqlQueryCoordinates, valuesForCoordinates)
      .catch(e => {
        alert("error add coordinates " + JSON.stringify(e));
      });
  }

  deleteTodo(todoId: string) {

    this.databaseObj.executeSql(" delete from Todos where _id =?", [todoId])
      .catch(e => {
        alert("error deleteTodo" + JSON.stringify(e));
        console.log(e)
      });
  }

  editTodo(todo: EditTodoLocalModel) {

    var sqlQuery = "Update Todos set description = ? , isCompleted = ?, isSynced = ?  , image = ?, action = ? , isDisplayable = ? where _id LIKE ? ;";

    var values = [todo.description || null, todo.isCompleted ? 1 : 0, todo.isSynced ? 1 : 0, todo.image ? todo.image.toString() : null, todo.action, todo.isDisplayable ? 1 : 0, todo._id];

    this.databaseObj.executeSql(sqlQuery, values)
      .catch(e => {
        alert("error editTodo" + JSON.stringify(e));
        console.log(e)
      });
  }

  saveDeletedTodo(todo: DeleteTodoLocalModel) {

    var sqlQuery = "Insert into Todos (_id, isSynced, isDisplayable, action) values (?,0,0,2) ;";

    var values = [todo._id];


    this.databaseObj.executeSql(sqlQuery, values)
      .catch(e => {
        alert("error editTodo" + JSON.stringify(e));
        console.log(e)
      });
  }

  updateTodoStatus(todo: EditTodoStatusLocalModel) {

    this.databaseObj.executeSql(" update  Todos set action = ? , isSynced= ? , isDisplayable = ? ,  isCompleted = NOT IsCompleted where _id=?", [todo.action, todo.isSynced ? 1 : 0, todo.isDisplayable ? 1 : 0, todo._id])
      .catch(e => {
        alert("error updateTodoStatus" + JSON.stringify(e))
      });
  }

  async fullTodoSync() {

    this.databaseObj.executeSql("select * from Todos where isSynced = 0", [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      });

    var todosToSynk = new SyncNewTodosModel();
    todosToSynk.todoList = this.row_data;
    try {
      var res = await this.syncService.syncTodos(todosToSynk);
      if (res) {
        this.cleanSynced();
      }
    }
    catch (ex) {
      console.log("can't sync", ex)
    }

  }

  async getAllLocal(): Promise<Array<ResponseTodoGetAllTodosModelItem>> {

    var todos = new Array<ResponseTodoGetAllTodosModelItem>();
    this.databaseObj.executeSql("select * from Todos ", [])
      .then((res) => {

        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            if (res.rows.item(i).isDisplayable == 1) {
              todos.push(res.rows.item(i));
            }
          }
        }
      })
      .catch(e => {
        console.log(e);
        alert("cant get all  " + JSON.stringify(e));
      });

    var coordinates = new Array<Coordinates>();
    this.databaseObj.executeSql("select * from Coordinates ", [])
      .then((res) => {

        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            coordinates.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        console.log(e);
        alert("cant get all  " + JSON.stringify(e));
      });

    todos.forEach(td => td.coordinates = (coordinates.find(cd => cd.todo_id == td._id)));
    return todos;
  }

  async getAllLocalForTest(): Promise<Array<EditTodoLocalModel>> {


    var todos = new Array<EditTodoLocalModel>();
    this.databaseObj.executeSql("select * from Todos ", [])
      .then((res) => {
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            todos.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        console.log(e);
        alert("cant get all  " + JSON.stringify(e));
      });

    var coordinates = new Array<Coordinates>();
    this.databaseObj.executeSql("select * from Coordinates ", [])
      .then((res) => {

        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            coordinates.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        console.log(e);
        alert("cant get all  " + JSON.stringify(e));
      });

    todos.forEach(td => td.coordinates = (coordinates.find(cd => cd.todo_id == td._id)));

    return todos;
  }

  private cleanSynced() {

    this.databaseObj.executeSql("update  Todos set (isSynced) = 1 where isSynced = 0", []);
    this.databaseObj.executeSql("delete from  Todos  where isDisplayable = 0", []);
  }
  cleanDatabase(){
    this.databaseObj.executeSql("delete from  Coordinates ", []);
    this.databaseObj.executeSql("delete from  Todos ", []);
  }
}
