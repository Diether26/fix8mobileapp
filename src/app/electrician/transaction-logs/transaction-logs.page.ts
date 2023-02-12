import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';

@Component({
  selector: 'app-transaction-logs',
  templateUrl: './transaction-logs.page.html',
  styleUrls: ['./transaction-logs.page.scss'],
})
export class TransactionLogsPage implements OnInit {
  loading = false;
  invoices: any;
  constructor(
    private electricianService: ElectricianService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices(){
    this.loading = true;
    this.electricianService.getInvoices()
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.invoices = response.invoices;
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  formatDate(date: any) {
    return new Date(date).toDateString();
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
