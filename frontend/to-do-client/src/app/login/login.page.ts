import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  providers: [ AuthService ]
})


export class LoginPage implements OnInit {

  email:string=""
  password:string=""
  public user : User;


  constructor(private authService: AuthService) {
    this.user = new User();
  }
validateLogin() {
    if(this.user.email && this.user.password) {
        this.authService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter email and password');
    }
  }
ngOnInit(){}

login(){
const{email, password}= this 
try{

}
catch(err){

}
}
}

