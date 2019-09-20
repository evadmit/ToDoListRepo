import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseTodoEditTodoModelItem } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-edit-to-do',
  templateUrl: './edit-to-do.page.html',
  styleUrls: ['./edit-to-do.page.scss'],
})
export class EditToDoPage implements OnInit {

   item: ResponseTodoEditTodoModelItem;
  constructor(private route: ActivatedRoute, private router: Router, private todoService:TodoService,public events: Events)
   {   
     this.route.queryParams.subscribe(params => {
    if (params && params.special) {
      console.log(params);
      this.item = JSON.parse(params.special);
     
    }
  });}

  ngOnInit() {
  }
async editToDo()
{
await this.todoService.editTodo(this.item);
this.events.publish('todo:edited');
this.router.navigateByUrl('/tabs');
}
}
