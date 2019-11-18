import { Injectable } from '@angular/core';
import { SyncNewTodosModel } from '../models/local-todos';
import { SYNC_TODOS_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private http: HttpClient,private authService: AuthService,public events: Events) { }

  async syncTodos (todos : SyncNewTodosModel):Promise<boolean>{
    if(!this.authService.isAuthenticated())
    {
      console.log("auth error");
    }
  
    var res = await this.http.post<SyncNewTodosModel>(SYNC_TODOS_URL,todos).toPromise();
    if(!res){
      return false;
    }

    return true;
  }
 
}
