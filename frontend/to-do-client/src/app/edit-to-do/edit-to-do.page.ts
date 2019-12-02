import { Component, OnInit} from '@angular/core';
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

  camera: Camera;
  cameraOptions: CameraOptions;
  item: ResponseTodoEditTodoModelItem;

  constructor(
    private cameraService: CameraService,
    private route: ActivatedRoute, private router: Router, private todoService: TodoService, private events: Events) 
    {
    this.camera = new Camera();
    this.cameraOptions = this.cameraService.options;
    this.route.queryParams.subscribe(params => {

      if (params && params.special) {
        this.item = JSON.parse(params.special);

        this.events.publish('coordinates:setup', this.item.coordinates);
      }
    });
  }

  public ngOnInit() {

  }
  public ngAfterViewInit() {

  }

  async editToDo() {
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
