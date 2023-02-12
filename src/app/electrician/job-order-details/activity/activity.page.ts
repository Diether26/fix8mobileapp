import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthJWTService } from 'src/app/services/AuthJWT/auth-jwt.service';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  @ViewChild("activityContent",{static:false}) private activityContent: any;
  Activities: any;
  Content: any;
  Id: any;
  UID: any;
  loading = false;
  constructor(
    private electricianService: ElectricianService,
    private toastController: ToastController,
    private authJWT: AuthJWTService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.Id = localStorage.getItem("selected-job-order");
    this.UID = this.authJWT.getId();
    this.loading = true;
    this.getActivities();
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      if (this.activityContent.scrollToBottom) {
          this.activityContent.scrollToBottom(400);
      }
    }, 500);
  }

  onChange(ev: any) {

  }

  getActivities(){
    this.electricianService.getActivities(this.Id)
    .pipe(
      finalize(() => {
        //loading part rajud ni
        if (this.loading === true) {
          setTimeout(() => { 
            this.loading = false;
          }, 300);
        }
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.Activities = response.activities
        this.scrollToBottomOnInit();
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  submitReport() {
    this.loading = true;
    this.electricianService.submitReport(this.Id, this.Content)
    .pipe(
      finalize(() => {
        setTimeout(() => { 
          this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      if (response.flag) {
        this.getActivities();
        this.Content = "";
      } else {
        this.presentToast(response.message)
      }
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }

  selectTextarea() {
    this.scrollToBottomOnInit();
  }

  preventFocusChange(ev: any) {
    ev.preventDefault();
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
