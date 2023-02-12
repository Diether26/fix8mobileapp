import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { CommonAPIService } from 'src/app/services/CommonAPI/common-api.service';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';
import { environment } from 'src/environments/environment';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-job-order-details',
  templateUrl: './job-order-details.page.html',
  styleUrls: ['./job-order-details.page.scss'],
})
export class JobOrderDetailsPage implements OnInit {
  Id: any;
  loading = false;
  isPopoverOpen = false;
  contractDetails : any = {
    Id : 0,
    JobOrderId: 0,
    ContractFile: null,
    DateRequested: null
  }
  constructor(
    private commonAPI: CommonAPIService,
    private toastController: ToastController,
    private electricianService : ElectricianService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = localStorage.getItem("selected-job-order");
    this.getContract();
  }

  ionViewWillLeave() {
    localStorage.removeItem("selected-job-order");
  }

  getContract() {
    this.loading = true;
    this.initPopover(false)
    this.electricianService.getContract(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.contractDetails = response.contractDetails;
      } else {
        // this.presentToast(response.message)
      }
    },
    (error:any) => {
      // this.presentToast(error.message)
    });
  }

  viewContractFile() {
    this.loading = true;
    this.initPopover(false)
    // START HERE FOR PDF VIEWER
    let contractFileUrl = `${environment.contract_url}${this.contractDetails.ContractFile}`

    Browser.open({ url: contractFileUrl});
    // END HERE FOR PDF VIEWER
    this.loading = false;
  }

  requestContract() {
    this.loading = true;
    let data = {
      id: parseInt(this.Id)
    }
    this.initPopover(false)
    this.electricianService.requestContract(data)
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
