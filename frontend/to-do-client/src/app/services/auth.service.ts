import { Injectable } from  '@angular/core';
import { Observable, BehaviorSubject } from  'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from  '@ionic/storage';
import { tap } from  'rxjs/operators';
import config from '../config/config';
import { HttpClient } from '@angular/common/http';
import { User, LoginResponseModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform,private http: HttpClient) {this.plt.ready().then(() => {
    this.checkToken();
  }); }

 async validateLogin(user: User): Promise<boolean>{
  console.log("begin validating... ", user);
 var res = await this.http.post<LoginResponseModel>('http://localhost:3003/auth/login', {
     email: user.email,
     password: user.password
   }).toPromise();

     console.log("res ", res);
     if (!res.user) {
      
       return false;
     }
     if (res.user) {
       await this.login(res.token);
       await this.storage.set("ACCESS_TOKEN", res.token);
       console.log("token: ", res.token);
     }

   console.log("res ", res);
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
    console.log("token", token );
    await this.storage.set(config.TOKEN_KEY, token);
    this.authenticationState.next(true);
  }

  logout() {
    return this.storage.remove(config.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      console.log("auth done");
           
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
 

