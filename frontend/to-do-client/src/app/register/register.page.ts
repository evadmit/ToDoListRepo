import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { RegisterUser } from '../models/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  name:string=""
  email:string=""
  password:string=""
  confirmPassword:string=""
  public registerUser : RegisterUser;



  constructor() 
  { 
    this.registerUser = new RegisterUser();
  }

  ngOnInit() {
  }
register()
{
  const{name, email, password, confirmPassword}= this 

}
}
