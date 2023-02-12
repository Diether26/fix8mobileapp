import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { CommonAPIService } from 'src/app/services/CommonAPI/common-api.service';

@Component({
  selector: 'app-job-order-details',
  templateUrl: './job-order-details.page.html',
  styleUrls: ['./job-order-details.page.scss'],
})
export class JobOrderDetailsPage implements OnInit {
  Id: any;
  loading = false;
  isPopoverOpen = false;
  constructor(
    private commonAPI: CommonAPIService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = localStorage.getItem("selected-job-order");
  }

  ionViewWillLeave() {
    localStorage.removeItem("selected-job-order");
  }

  reportUser(){
    this.loading = true;
    let data = {
      id: parseInt(this.Id)
    }
    this.initPopover(false)
    this.commonAPI.reportUser(data)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.presentToast(response.message)
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  initPopover(flag: boolean) {
    this.isPopoverOpen = flag;
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
