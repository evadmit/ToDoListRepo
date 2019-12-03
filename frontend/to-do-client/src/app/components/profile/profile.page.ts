import { Component, OnInit } from '@angular/core';
import { EditTodoLocalModel } from '../../models/local-todos';
import { SqliteService } from '../../services/sqlite.service';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {


  private items: Array<EditTodoLocalModel>;
  
  constructor(private storage: Storage,private router: Router,private sqliteService: SqliteService, private events: Events) {
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
  async exitApp() {
    await this.storage.clear();
    await this.sqliteService.cleanDatabase();
    this.router.navigateByUrl('/login');
  }


}
