import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import config from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginResponseModel, GoogleLoginRequestModel } from '../models/user';
import { LOGIN_AUTH_URL, FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(async () => {
      await this.checkToken();
    });
  }

  async validateLogin(user: User): Promise<boolean> {
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

  async facebookLogin(token : string):Promise<boolean>{

     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ('Bearer ' + token)
      })
    };
  
    var res = await this.http.get<LoginResponseModel>(FACEBOOK_AUTH_URL,httpOptions).toPromise();

    if (!res.user) {

      return false;
    }

    if (res.user) {
        await this.login(res.token);
        await this.storage.set("ACCESS_TOKEN", res.token);
    }
console.log("successfuly logged fb:", res.token);
return true;

  }

  async googleLogin(model : GoogleLoginRequestModel):Promise<boolean>{

   var res = await this.http.post<LoginResponseModel>(GOOGLE_AUTH_URL, model).toPromise();
console.log(res);
   if (!res.user) {

     return false;
   }

   if (res.user) {
       await this.login(res.token);
       await this.storage.set("ACCESS_TOKEN", res.token);
   }
console.log("successfuly logged google:", res.token);
return true;

 }

  async checkToken() {
    await  this.storage.get(config.TOKEN_KEY).then(res => {
     
console.log("checkToken ", res);
      if (res) {
      this.authenticationState.next(true);
      }
    });
  }

  async login(token: string) {
    await this.storage.set(config.TOKEN_KEY, token);
    this.authenticationState.next(true);
  }

    logout() {
        return this.storage.remove(config.TOKEN_KEY).then(() => {
            this.authenticationState.next(false);

        });
    }

   isAuthenticated()  {
       
       var isAuth =  this.authenticationState.value; 
        return isAuth;
  }
}


