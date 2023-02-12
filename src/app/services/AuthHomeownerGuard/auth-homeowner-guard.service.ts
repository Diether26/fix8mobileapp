import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthJWTService } from '../AuthJWT/auth-jwt.service';
import  decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthHomeownerGuardService implements CanActivate {

  constructor(
    private AuthJWTService: AuthJWTService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean  {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    if (tokenPayload !== null) {
      if (!this.AuthJWTService.isAuthenticated() || tokenPayload.Usertype !== expectedRole) {
        localStorage.removeItem("token");
        this.router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
