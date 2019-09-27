import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  constructor(private todoService: TodoService, private router: Router, public events: Events) {
    this.todo = new NewToDoModel();
    this.events.subscribe('location:changed',async (location) => {
      await this.setLocation(location); });
   
  }
  ngOnInit() {
  }


  async setLocation(location: any) {
    this.todo.coordinates=location;
  }

  async saveToDo() {
    if (this.todo.title && this.todo.description) {

      console.log("todo: ", this.todo);

      var res = await this.todoService.addTodo(this.todo);
      console.log("res ", res);

      this.events.publish('todo:added');
      await this.router.navigateByUrl('/tabs');

    }

  }




}
