import { Component, OnInit } from '@angular/core';
import { User, LoginResponseModel, GoogleLoginRequestModel } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User;
  userdata:string;

  constructor(private authService: AuthService, 
    private router: Router, 
    private fb: Facebook, 
    private http : HttpClient,
    private googlePlus: GooglePlus) {
    this.user = new User();
  }

   validateLogin() {
    if (this.user.email && this.user.password) {
      var result =  this.authService.validateLogin(this.user);
      if (result) {
        this.router.navigateByUrl('/tabs');
      }
    } else {
      alert('enter email and password');
    }
  }

 loginWithFacebook(){

    this.fb.login(['public_profile', 'email'])
    .then(async (res: FacebookLoginResponse) => 
    {
      var result = await this.authService.facebookLogin(res.authResponse.accessToken);
      if (result) {
        console.log("loginWithFacebook result ", result)
      await  this.router.navigateByUrl('/tabs');
      }
     else {
      alert('Error logging into Facebook');
    }
  
  })
    .catch(e => console.log('Error logging into Facebook', e));
  
  
  this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  loginWithGoogle(){
    this.googlePlus.login({})
  .then(async res => {
    console.log("GoogleLoginRequestModel ", res);

      var googleLoginModel = new GoogleLoginRequestModel();
      googleLoginModel.email = res.email;
      googleLoginModel.name = res.displayName;
      googleLoginModel.password = res.userId;

    var result = await this.authService.googleLogin(googleLoginModel);
    if(result){
      await  this.router.navigateByUrl('/tabs');
    }
    console.log(result);
  })
  .catch(err => console.error(err));
  }
  ngOnInit() {
  }
}