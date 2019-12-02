import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private router: Router,
    public auth: AuthService) { }

  public  canActivate(next: ActivatedRouteSnapshot) {
    var isAuth: boolean;
    this.auth.checkToken().then(async ()=>
    {
      isAuth = this.auth.isAuthenticated();  
      console.log("isAuth",isAuth); 
      if (isAuth) 
    {

    await this.router.navigate(['to-do-list']);
      return false;
    }
    });

   
    return true;
  
  }
}
