import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { HomeownerService } from 'src/app/services/homeowner/homeowner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.page.html',
  styleUrls: ['./invoice-details.page.scss'],
})
export class InvoiceDetailsPage implements OnInit {
  Id: any;
  loading = false;
  invoice: any;
  invoice_items: any = [];
  payment_details: any;
  modal = '';
  paymentReceipt_url = environment.paymentReceipt_url;
  constructor(
    private activatedRoute: ActivatedRoute,
    private homeownerServices: HomeownerService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInvoiceDetails();
  }

  viewPaymentDetails(id: any) {
    this.loading = true;
    this.homeownerServices.getPaymentDetails(id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.payment_details = response.paymentDetails;
      this.initModal("PAYMENT");
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  getInvoiceDetails(){
    this.loading = true;
    this.homeownerServices.getInvoiceDetails(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.invoice = response.invoiceDetails;
      this.invoice_items = response.invoiceItems;
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  calculateAmountItems(totalCost: any, amountItems: any) {
    return parseFloat(totalCost) - parseFloat(amountItems);
  }

  formatDate(date: any) {
    return new Date(date).toDateString();
  }

  formatToPHPCurrency(amount: any) {
    return `₱${parseFloat(amount).toFixed(2)}`;
  }

  initModal(modal: any) {
    this.modal = modal;
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
  
    await toast.present();
  }

}
