import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthJWTService } from 'src/app/services/AuthJWT/auth-jwt.service';
import { HomeownerService } from 'src/app/services/homeowner/homeowner.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  @ViewChild("activityContent",{static:false}) private activityContent: any;
  Activities: any;
  Id: any;
  UID: any;
  loading = false;
  constructor(
    private homeownerService: HomeownerService,
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

  getActivities(){
    this.homeownerService.getActivities(this.Id)
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

  scrollToBottomOnInit() {
    setTimeout(() => {
      if (this.activityContent.scrollToBottom) {
          this.activityContent.scrollToBottom(400);
      }
    }, 500);
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
