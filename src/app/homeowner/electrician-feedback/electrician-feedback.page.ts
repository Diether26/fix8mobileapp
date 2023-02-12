import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeownerService } from 'src/app/services/homeowner/homeowner.service';
import { finalize } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-electrician-feedback',
  templateUrl: './electrician-feedback.page.html',
  styleUrls: ['./electrician-feedback.page.scss'],
})
export class ElectricianFeedbackPage implements OnInit {
  Id: any;
  allfeedbacks:any=[];
  loading = false;
  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private homeownerService: HomeownerService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAllelecfeedbacks(this.Id);
  }

  getAllelecfeedbacks(id: any){
    this.loading = true;
    this.homeownerService.getAllElectricianFeedback(id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.allfeedbacks = response.feedback;
      console.log(response);
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
