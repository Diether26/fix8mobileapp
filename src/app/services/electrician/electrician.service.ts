import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElectricianService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public registerElectrician(data: FormData) {
    let api_endpoint = `${environment.api}electrician/auth/register`;
    return this.httpClient.post(api_endpoint, data);
  }

  public updateElectrician(data: FormData) {
    let api_endpoint = `${environment.api}electrician/account/update`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getElectricianFeedBack(){
    let api_endpoint = `${environment.api}electrician/feedback/top`;
    return this.httpClient.get(api_endpoint);
  }
  
  public getAllElectricianFeedback(){
    let api_endpoint = `${environment.api}electrician/feedback/`;
    return this.httpClient.get(api_endpoint);
  }

  public getJobOrders(){
    let api_endpoint = `${environment.api}electrician/joborder`;
    return this.httpClient.get(api_endpoint);
  }

  public getJobOrderDetails(id: any){
    let api_endpoint = `${environment.api}electrician/joborder/details?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }

  public acceptJobOrder(id: any){
    let data = {
      id
    }
    let api_endpoint = `${environment.api}electrician/joborder/accept`;
    return this.httpClient.post(api_endpoint, data);
  }

  public rejectJobOrder(id: any){
    let data = {
      id
    }
    let api_endpoint = `${environment.api}electrician/joborder/reject`;
    return this.httpClient.post(api_endpoint, data);
  }

  public inpJobOrder(id: any){
    let data = {
      id
    }
    let api_endpoint = `${environment.api}electrician/joborder/in-progress`;
    return this.httpClient.post(api_endpoint, data);
  }

  public doneJobOrder(id: any){
    let data = {
      id
    }
    let api_endpoint = `${environment.api}electrician/joborder/complete`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getActivities(id: any){
    let api_endpoint = `${environment.api}electrician/progress?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }
  
  public submitReport(Id: any, Content:any) {
    let data = {
      id: Id,
      remarks: Content
    }
    let api_endpoint = `${environment.api}electrician/progress/submit`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getSubscription(){
    let api_endpoint = `${environment.api}electrician/subscription`;
    return this.httpClient.get(api_endpoint);
  }

  public submitSubscription(data: FormData) {
    let api_endpoint = `${environment.api}electrician/subscription/submit`;
    return this.httpClient.post(api_endpoint, data);
  }

  public createInvoice(data: FormData) {
    let api_endpoint = `${environment.api}electrician/joborder/create-invoice`;
    return this.httpClient.post(api_endpoint, data);
  }

  public updatePassword(OldPassword: any,NewPassword:any,ConfirmPassword:any){
    let data = {
      OldPassword,
      NewPassword,
      ConfirmPassword
    }
    let api_endpoint = `${environment.api}electrician/account/change-password`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getInvoices() {
    let api_endpoint = `${environment.api}electrician/report/invoices`;
    return this.httpClient.get(api_endpoint);
  }

  public getInvoiceDetails(id: any) {
    let api_endpoint = `${environment.api}electrician/report/invoice-details?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }

  public getPaymentDetails(id: any) {
    let api_endpoint = `${environment.api}electrician/report/payment-details?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }

  public requestContract(data: any) {
    let api_endpoint = `${environment.api}electrician/joborder/request-contract`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getContract(id: any) {
    let api_endpoint = `${environment.api}electrician/joborder/view-contract?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }
}
