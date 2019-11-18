import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ResponseTodoGetAllTodosModelItem } from '../models/todo';
import { Events, IonItemSliding} from '@ionic/angular';
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
this.items.splice(this.items.findIndex(x => x._id == itemId), 1)
await this.todoService.deleteToDo(itemId);
await this.FillToDoList();
}

async updateItemStatus(item: ResponseTodoGetAllTodosModelItem){
  await this.todoService.updateStatus(item);
  await this.FillToDoList();
  }

async edit(item: ResponseTodoGetAllTodosModelItem, slidingItem: IonItemSliding){
  slidingItem.close();
  this.events.publish('coordinates:setup',item.coordinates);
  let navigationExtras: NavigationExtras = {
    queryParams: {
      special: JSON.stringify(item)
    }
  };
  await this.router.navigate(['/edit-to-do'], navigationExtras);
}

async addNew(){
  await this.router.navigate(['/new-to-do']);
}
doRefresh(event) {

  setTimeout(async () => {
    await this.FillToDoList().then(event.target.complete());
    event.target.complete();
  }, 1000);
}
}
