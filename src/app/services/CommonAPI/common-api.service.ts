import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public reportUser(data:any) {
    let api_endpoint = `${environment.api}common/report-user`;
    return this.httpClient.post(api_endpoint, data);
  }
}
