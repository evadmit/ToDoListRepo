import { Component, OnInit } from '@angular/core';
import { EditTodoLocalModel } from '../models/local-todos';
import { SqliteService } from '../services/sqlite.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {


  private items: Array<EditTodoLocalModel>;
  
  constructor(private sqliteService: SqliteService, private events: Events) {
    this.events.subscribe('todo:added', async () => {
      await this.fillList();
    });
    this.events.subscribe('todo:edited', async () => {
      await this.fillList();
    });

  }

  async ngOnInit() {

    await this.fillList();
  }
  
  private async fillList() {
    this.items = await this.sqliteService.getAllLocalForTest();
    console.log("local data", this.items);
  }

  headerTitle(value: {}) {
    return Object.keys(value);
  }


}
