import { Injectable } from  '@angular/core';
import { Observable, BehaviorSubject } from  'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from  '@ionic/storage';
import { tap } from  'rxjs/operators';
import config from '../config/config';
import { HttpClient } from '@angular/common/http';
import { User, LoginResponseModel } from '../models/user';
import { LOGIN_AUTH_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform,private http: HttpClient) {this.plt.ready().then(() => {
    this.checkToken();
  }); }

 async validateLogin(user: User): Promise<boolean>{
 var res = await this.http.post<LoginResponseModel>(LOGIN_AUTH_URL, {
     email: user.email,
     password: user.password
   }).toPromise();

     if (!res.user) {
      
       return false;
     }
     if (res.user) {
       await this.login(res.token);
       await this.storage.set("ACCESS_TOKEN", res.token);
     }

        return true;
        
  }

  checkToken() {
    this.storage.get(config.TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  async login(token) {
    await this.storage.set(config.TOKEN_KEY, token);
    this.authenticationState.next(true);
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
 

