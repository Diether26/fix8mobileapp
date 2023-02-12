import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public sendMessage(Id: any, Content:any) {
    let data = {
      Id,
      Content
    }
    let api_endpoint = `${environment.api}common/message/send`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getMessages(Id: any, last_id: any) {
    let api_endpoint = `${environment.api}common/message?id=${Id}&last_id=${last_id}`;
    return this.httpClient.get(api_endpoint);
  }
}
