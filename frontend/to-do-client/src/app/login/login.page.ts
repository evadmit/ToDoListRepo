import { Component, OnInit } from '@angular/core';
import { User, LoginResponseModel } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string=""
  password:string=""
  public user : User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }
  validateLogin() {
    if(this.user.email && this.user.password) {
  var result =  this.authService.validateLogin(this.user);
  if(result){
    this.router.navigateByUrl('/tabs');
  }
    } else {
        alert('enter email and password');
    }
  }
  ngOnInit() {
  }
}