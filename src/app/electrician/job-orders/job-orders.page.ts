import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';

@Component({
  selector: 'app-job-orders',
  templateUrl: './job-orders.page.html',
  styleUrls: ['./job-orders.page.scss'],
})
export class JobOrdersPage implements OnInit {
  joborders: any;
  loading = false;
  constructor(
    private toastController: ToastController,
    private electricianService: ElectricianService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getJobOrders();
  }

  seeDetails(id:any) {
    localStorage.setItem("selected-job-order", id);
    this.navCtrl.navigateForward(`/Electrician/JobOrders/${id}`);
  }

  getJobOrders() {
    this.loading = true;
    this.electricianService.getJobOrders()
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.joborders = response.jobOrders;
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
