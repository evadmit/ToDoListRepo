import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { UserService } from '../services/user.service';
import { RegisterRequestModel } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private registerUser: RegisterUser;

  constructor(private userService: UserService) {
    this.registerUser = new RegisterUser();
  }

  ngOnInit() {
  }

  async register() {

    if (this.registerUser.password != this.registerUser.confirmPassword) 
    {
      alert("password doesn't match");
    }
    var newUser = new RegisterRequestModel();
    newUser.email = this.registerUser.email;
    newUser.name = this.registerUser.name;
    newUser.password = this.registerUser.password;

    await this.userService.register(newUser);
  }
}
