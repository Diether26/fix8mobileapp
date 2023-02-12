import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, IonModal } from '@ionic/angular';
import { finalize } from 'rxjs';
import { HomeownerService } from 'src/app/services/homeowner/homeowner.service';
import { environment } from 'src/environments/environment';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modalCancelJO: IonModal;
  Id: any;
  jobOrder: any = {};
  hasFeedback = false;
  loading = false;
  buildingpermit_url: any = environment.buildingpermit_url;
  blueprint_url: any = environment.blueprint_url;
  isCash = false;
  picURL: any="";
  cancelJO = {
    reason: "",
    loading: false
  }
  feedback = {
    rate: 0,
    comment: "",
    loading: false
  }
  modal = "";

  payment={
    PaymentMethod : "",
    invoiceid: 0,
    amount:0,
    refno:"",
    receipt:"",
    loading:false
  }

  constructor(
    private toastController: ToastController,
    private homeownerService: HomeownerService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = localStorage.getItem("selected-job-order");
    this.getJobOrderDetails();
  }

  initModal(flag: string) {
    this.modal = flag;
  }

openmodalblueprint(picString:string){
    this.picURL = this.blueprint_url.concat(picString);
 }

openmodalpermit(picString:string){
  this.picURL = this.buildingpermit_url.concat(picString);
 }

changePaymentMethod(){
 if(this.payment.PaymentMethod==="Cash on Hand"){
  this.isCash = false;
 }else{
  this.isCash = true;
 }
}

 cancel() {
  this.modalController.dismiss();
}

GetFileValue(ev:any){
  this.payment.receipt = ev.target.files[0];
}

  submitProofOfPayment(){
    this.payment.loading =true;
    let formData = new FormData();
    formData.append("id", this.Id);
    formData.append("PaymentMethod", this.payment.PaymentMethod);
    formData.append("ReferenceNumber", this.payment.refno);
    formData.append("Receipt", this.payment.receipt);

    this.homeownerService.submitProofOfPayment(formData)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
          this.payment.loading =false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.presentToast(response.message)
        this.getJobOrderDetails();
      } else {
        this.presentToast(response.message)
        this.payment.loading =false;
      }
    },
    (error:any) => {
      this.presentToast(error.message)
      this.payment.loading =false;
    });
  }

  submitFeedback() {
    this.feedback.loading = true;
    this.homeownerService.submitFeedback(this.Id, this.feedback.rate, this.feedback.comment)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
          this.feedback.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.initModal("");
        this.presentToast(response.message)
        this.getJobOrderDetails();
        this.feedback.comment = "";
        this.feedback.rate = 0;
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  confirmCancelJO() {
    this.cancelJO.loading = true;
    this.homeownerService.cancelJobOrder(this.Id, this.cancelJO.reason)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
          this.cancelJO.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.initModal("");
        this.presentToast(response.message)
        this.getJobOrderDetails();
        this.cancelJO.reason = "";
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  getJobOrderDetails(){
    this.loading = true;
    this.homeownerService.getJobOrderDetails(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.jobOrder = response.jobOrder;
        this.hasFeedback = response.hasFeedback;
        this.jobOrder.AppointmentDate = new Date(this.jobOrder.AppointmentDate).toDateString();
        console.log(this.jobOrder)
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
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
