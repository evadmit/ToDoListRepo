import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ResponseTodoGetAllTodosModelItem } from '../models/todo';
import { Events } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.page.html',
  styleUrls: ['./to-do-list.page.scss'],
})
export class ToDoListPage implements OnInit {

  items: Array<ResponseTodoGetAllTodosModelItem>;

  constructor(public todoService: TodoService,private router: Router, public events: Events) {
    events.subscribe('todo:added', async () => {
      await this.FillToDoList();
    });
    events.subscribe('todo:edited', async () => {
      await this.FillToDoList();
    });
   }

  async ngOnInit() {
    await this.FillToDoList();
    
  }
async FillToDoList(){
  this.items = await this.todoService.getToDoList();
}
async deleteItem(itemId: string){
await this.todoService.deleteToDo(itemId);
await this.FillToDoList();
}

async edit(item: ResponseTodoGetAllTodosModelItem){
  console.log("navigating....", item);
  let navigationExtras: NavigationExtras = {
    queryParams: {
      special: JSON.stringify(item)
    }
  };
  console.log("navigationExtras....", navigationExtras);
  this.router.navigate(['/edit-to-do'], navigationExtras);
}
}
