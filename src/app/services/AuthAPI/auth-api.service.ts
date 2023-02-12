import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public loginAccount(data:any) {
    let api_endpoint = `${environment.api}common/auth`;
    return this.httpClient.post(api_endpoint, data);
  }

  public me() {
    let api_endpoint = `${environment.api}common/auth/me`;
    return this.httpClient.get(api_endpoint);
  }

  public refreshToken() {
    let api_endpoint = `${environment.api}common/auth/refresh-token`;
    return this.httpClient.get(api_endpoint);
  }

  public logout() {
    let api_endpoint = `${environment.api}common/auth/logout`;
    return this.httpClient.get(api_endpoint);
  }

  public resetPassword(data:any) {
    let api_endpoint = `${environment.api}common/auth/reset-password`;
    return this.httpClient.post(api_endpoint, data);
  }
}
