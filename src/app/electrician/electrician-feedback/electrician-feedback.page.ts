import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';
@Component({
  selector: 'app-electrician-feedback',
  templateUrl: './electrician-feedback.page.html',
  styleUrls: ['./electrician-feedback.page.scss'],
})
export class ElectricianFeedbackPage implements OnInit {
  allfeedbacks:any=[];
  loading = false;
  constructor(   
    private toastController: ToastController,
    private electricianService: ElectricianService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAllMyfeedbacks();
  }

  getAllMyfeedbacks(){
    this.loading = true;
    this.electricianService.getAllElectricianFeedback()
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.allfeedbacks = response.feedback;
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
