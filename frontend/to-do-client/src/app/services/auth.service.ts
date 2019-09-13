import { Injectable } from  '@angular/core';
import { Observable, BehaviorSubject } from  'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from  '@ionic/storage';
import config from '../config/config';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform,private http: HttpClient) {this.plt.ready().then(() => {
    this.checkToken();
  }); }

 validateLogin(user: User){
        return this.http.post('/api/user/login',{
            email : user.email,
            password : user.password
        })
         
  }

  checkToken() {
    this.storage.get(config.TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login(token) {
    return this.storage.set(config.TOKEN_KEY, token).then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(config.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
 

