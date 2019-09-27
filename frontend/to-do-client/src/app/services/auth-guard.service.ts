import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {
  
  constructor(private router: Router, public auth: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {

    console.log(route);


    if (!this.auth.isAuthenticated()) {
        this.router.navigate(['login']);
        return false;
    }

    return true;
  }

}
