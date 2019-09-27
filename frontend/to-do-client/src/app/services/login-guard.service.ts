import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(  private router: Router,
     public auth: AuthService) { }

    public canActivate(next: ActivatedRouteSnapshot) {
      if (this.auth.isAuthenticated()) {
        this.router.navigate(['to-do-list']);
        return false;
      }
      return true;
    }
}
