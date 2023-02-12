import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthJWTService } from 'src/app/services/AuthJWT/auth-jwt.service';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  loading = false;
  loadingSubmit = false;
  hasSubscribed: any;
  modal = ""
  referenceNumber: any;
  paymentReceipt: any;
  paymentReceiptFile: any;
  subscription: any;
  constructor(
    private authJWT: AuthJWTService,
    private toastController: ToastController,
    private electricianService: ElectricianService
  ) { }

  ngOnInit() {
    this.getSubscription();
  }

  submitPayment() {
    let flag = true;
    let message = [];
    if(!this.paymentReceiptFile){
      flag = false;
      message.push("Please upload payment reciept for your proof of payment.");
    }
    if(!this.referenceNumber){
      flag = false;
      message.push("Please enter reference number for your proof of payment.");
    }

    if (flag) {
      this.loadingSubmit = true;
      let formData = new FormData();
      formData.append("Receipt", this.paymentReceiptFile);
      formData.append("ReferenceNumber", this.referenceNumber);
      this.electricianService.submitSubscription(formData)
      .pipe(
        finalize(() => {
          //loading part rajud ni
          setTimeout(() => { 
          this.loadingSubmit = false;
          }, 300);
        })
      ).subscribe((response:any) => {
        if(response.flag == true) {
          this.presentToast(response.message)
          this.paymentReceipt = '';
          this.paymentReceiptFile = null;
          this.referenceNumber = '';
          this.initModal('')
          this.getSubscription();
        } else {
          console.log(response.message)
          this.presentToast(response.message)
        }
      },
      (error:any) => {
        console.log(error)
        this.presentToast(error.message)
      });  
    } else {
      this.presentToast(message)
    }
  }

  receiptOnChange(ev: any)
  {
      this.paymentReceiptFile = ev.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload=(event:any)=>{
        // this.paymentReceiptFile = event.target.result;
      }
  }

  getSubscription() {
    this.loading = true;
    this.hasSubscribed = this.authJWT.getHasSubscribed();
    this.electricianService.getSubscription()
      .pipe(
        finalize(() => {
          //loading part rajud ni
          setTimeout(() => { 
          this.loading = false;
          }, 300);
        })
      ).subscribe((response:any) => {
        this.subscription = response.subscription;
        this.hasSubscribed = response.subscription.Status === 'Verified' ? 1 : 0;
        console.log(response)
      },
      (error:any) => {
        console.log(error)
        this.presentToast(error.message)
      });  
  }

  initModal(modal: string) {
    this.modal = modal;
  }

  async presentToast(msg : any) {
    console.log(msg)
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
  
    await toast.present();
  }

}
