import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseTodoEditTodoModelItem } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { Events } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/Camera/ngx';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-edit-to-do',
  templateUrl: './edit-to-do.page.html',
  styleUrls: ['./edit-to-do.page.scss'],
})

export class EditToDoPage implements OnInit {

  public camera: Camera;
  cameraOptions: CameraOptions;
  item: ResponseTodoEditTodoModelItem;

  constructor( 
    private cameraService: CameraService,
    private route: ActivatedRoute, private router: Router, private todoService:TodoService,public events: Events)
   {  
  this.camera = new Camera();
   this.cameraOptions = this.cameraService.options;
     this.route.queryParams.subscribe(params => {
     if (params && params.special) {
      this.item = JSON.parse(params.special);
     // this.item.image="data:image/png;base64,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"
     
  this.events.publish('coordinates:setup', this.item.coordinates);
    }
  });}

  public ngOnInit() {
    
  }
  ngAfterViewInit() {
    console.log(this.item);

}

async editToDo()
{
await this.todoService.editTodo(this.item);
this.events.publish('todo:edited');
this.router.navigateByUrl('/tabs');
}

openCamera() {

      this.camera.getPicture(this.cameraOptions)
        .then(imageData => {
          this.item.image = 'data:image/jpeg;base64,' + imageData;
        })
        .catch((error) => {
          console.error(error);
        });
    
}

}
