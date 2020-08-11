import { LoginServiceService } from './login-service.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private ls: LoginServiceService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.ls.isUserLoggedIn()) {

      return true;
    }
    else{
      this.router.navigate(['home']);
      return false;
    }
  }
}
