import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeownerService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public registerHomeOwner(data: FormData) {
    let api_endpoint = `${environment.api}homeowner/auth/register`;
    return this.httpClient.post(api_endpoint, data);
  }

  public updateHomeowner(data: FormData) {
    let api_endpoint = `${environment.api}homeowner/account/update`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getActiveElectricians() {
    let api_endpoint = `${environment.api}homeowner/main/electricians`;
    return this.httpClient.get(api_endpoint);
  }

  public getElectricianDetails(Id: any){
    let api_endpoint = `${environment.api}homeowner/main/electrician?id=${Id}`;
    return this.httpClient.get(api_endpoint);
  }

  public getElectricianFeedback(Id: any){
    let api_endpoint = `${environment.api}homeowner/main/electrician-feedback`;
    return this.httpClient.get(api_endpoint, Id);
  }

  public getAllElectricianFeedback(Id: any){
    let api_endpoint = `${environment.api}homeowner/main/electrician-feedback?id=${Id}`;
    return this.httpClient.get(api_endpoint);
  }

  public createJobOrder(data: FormData){
    let api_endpoint = `${environment.api}homeowner/joborder/create`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getJobOrders(){
    let api_endpoint = `${environment.api}homeowner/joborder`;
    return this.httpClient.get(api_endpoint);
  }

  public getJobOrderDetails(id: any){
    let api_endpoint = `${environment.api}homeowner/joborder/details?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }

  public cancelJobOrder(id: any, reason: any){
    let data = {
      id,
      reason
    }
    let api_endpoint = `${environment.api}homeowner/joborder/cancel`;
    return this.httpClient.post(api_endpoint, data);
  }

  public submitFeedback(id: any, rate: any, comment: any){
    let data = {
      id,
      rate,
      comment
    }
    let api_endpoint = `${environment.api}homeowner/feedback/submit`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getActivities(id: any){
    let api_endpoint = `${environment.api}homeowner/progress?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }

  public submitProofOfPayment(data: FormData){
    let api_endpoint = `${environment.api}homeowner/joborder/submit-payment`;
    return this.httpClient.post(api_endpoint, data);
  }

  public updatePassword(OldPassword: any,NewPassword:any,ConfirmPassword:any){
    let data = {
      OldPassword,
      NewPassword,
      ConfirmPassword
    }
    let api_endpoint = `${environment.api}homeowner/account/change-password`;
    return this.httpClient.post(api_endpoint, data);
  }

  public getInvoices() {
    let api_endpoint = `${environment.api}homeowner/report/invoices`;
    return this.httpClient.get(api_endpoint);
  }

  public getInvoiceDetails(id: any) {
    let api_endpoint = `${environment.api}homeowner/report/invoice-details?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }

  public getPaymentDetails(id: any) {
    let api_endpoint = `${environment.api}homeowner/report/payment-details?id=${id}`;
    return this.httpClient.get(api_endpoint);
  }
}
