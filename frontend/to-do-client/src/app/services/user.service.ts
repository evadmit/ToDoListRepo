import { Injectable } from '@angular/core';
import { RegisterRequestModel, RegisterResponseModel } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { REGISTER_AUTH_URL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }


  async register(newUser: RegisterRequestModel): Promise<RegisterResponseModel> {

    try {
      var resp = await this.http.post<RegisterResponseModel>(REGISTER_AUTH_URL, newUser).toPromise();
      if (!resp.user) {
      }
      if (resp.user) {
        await this.authService.login(resp.token);

        this.router.navigateByUrl('/tabs');
      }
      return resp;
    }
    catch (err) {
      alert(JSON.stringify(err));

    }


  }


}