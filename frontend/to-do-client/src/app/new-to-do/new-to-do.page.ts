import { Component, OnInit } from '@angular/core';
import { ToDoListPage } from '../to-do-list/to-do-list.page';
import { NewToDoModel, Coordinates } from '../models/todo';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-new-to-do',
  templateUrl: './new-to-do.page.html',
  styleUrls: ['./new-to-do.page.scss'],
})
export class NewToDoPage implements OnInit {

  public todo: NewToDoModel;
  constructor(private todoService: TodoService, private router: Router,public events: Events) { 
    this.todo = new NewToDoModel();
  }
  saveToDo(){
if(this.todo.title && this.todo.description){

this.todo.coordinates = new Coordinates(22.3,23.5);
console.log("todo: ", this.todo);
var result = this.todoService.addTodo(this.todo);
if(result){
  
  this.events.publish('todo:added');
  this.router.navigateByUrl('/tabs');

}
}

  }


  ngOnInit() {
  }

}
