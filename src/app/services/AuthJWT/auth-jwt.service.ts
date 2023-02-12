import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import  decode from 'jwt-decode';
import { finalize } from 'rxjs';
import { AuthAPIService } from '../AuthAPI/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthJWTService {

  constructor(
    private jwtHelper: JwtHelperService,
    private authapiService: AuthAPIService
  ) { }

  public getToken(): any {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (token !== null) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } else {
      return false;
    }
  }

  public isHomeowner(): boolean {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    if (tokenPayload !== null) {
      if (tokenPayload.Usertype !== "Homeowner") {        
        return false;
      } else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  public isElectrician(): boolean {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    if (tokenPayload !== null) {
      if (tokenPayload.Usertype !== "Electrician") {        
        return false;
      } else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  public getId(): string {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    if (tokenPayload !== null) {
      return tokenPayload.Id
    }
    else {
      return "0";
    }
  }

  public getName(): string {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    if (tokenPayload !== null) {
      return tokenPayload.Firstname + " " + tokenPayload.Lastname
    }
    else {
      return "Fix8 User";
    }
  }

  public getEmail(): string {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    if (tokenPayload !== null) {
      return tokenPayload.Email
    }
    else {
      return "fix8@gmail.com";
    }
  }

  public getPicUrl(): string {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    if (tokenPayload !== null) {
      return tokenPayload.Avatar
    }
    else {
      return "./../assets/icon/logo.png";
    }
  }

  public getUsertype(): string {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    return tokenPayload.Usertype;
  }

  public getHasSubscribed(): string {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token ? decode(token) : null;
    return tokenPayload.hasSubscribed;
  }

  public refreshToken(): void {
    this.authapiService.refreshToken()
    .pipe(
      finalize(() => {
       //loading part rajud ni
      })
    ).subscribe((response:any) => {
      localStorage.setItem("token", response.token)
    },
    (error:any) => {
      console.log(error.message)
    });
  }
}
