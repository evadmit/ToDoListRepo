import { Injectable } from '@angular/core';
import { RegisterRequestModel, RegisterResponseModel } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }


  async register(newUser: RegisterRequestModel):Promise<RegisterResponseModel> {

      var resp = await this.http.post<RegisterResponseModel>('http://localhost:3003/auth/register/', newUser).toPromise();
      if(!resp.user){
          console.log("result: ", resp);
          }
          if (resp.user) {
            await this.authService.login( resp.token);
    
            console.log("token: ", resp.token);
            this.router.navigateByUrl('/tabs');
          }
return resp;

    }


}