import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthAPIService } from 'src/app/services/AuthAPI/auth-api.service';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ElectricianService } from 'src/app/services/electrician/electrician.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  me:any = {};
  NewDate:any="";
  avatar_url: any = environment.avatar_url
  certificate_url: any = environment.certificate_url
  resume_url: any = environment.resume_url
  feedbacktopfive:any = [];
  feedbackcount:any = 0;
  loading = false;
  constructor(
    private toastController: ToastController,
    private app: AppComponent,
    private authapiService: AuthAPIService,
    private electricianService : ElectricianService
  ) { }

  ngOnInit() {
  }

  getMyDetails() {
    this.loading = true;
    this.authapiService.me()
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.me = response.userData;
      this.me.Birthdate = new Date(this.me.Birthdate).toDateString();
    },
    (error:any) => {
      this.presentToast(error.message)
    });
  }
  
  getMyFeedBacks(){
    this.loading = true;
    this.electricianService.getElectricianFeedBack()
    .pipe(
      finalize(() => {
        //loading part rajud ni
        setTimeout(() => { 
        this.loading = false;
        }, 300);
      })
    ).subscribe((response:any) => {
      this.feedbacktopfive = response.feedback_top_five;
      this.feedbackcount = response.feedback_count;
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

  ionViewWillEnter() {
    this.app.reloadUser();
    this.getMyDetails();
    this.getMyFeedBacks();
  }
  downloadCertificate(document:string){
    this.loading = true;
    let certURL = this.certificate_url.concat(document);
    Browser.open({ url: certURL});
    this.loading = false;
  }
  
  downloadResume(document:string){
    this.loading = true;
    let resumeURL = this.resume_url.concat(document);
    Browser.open({ url: resumeURL});
    this.loading = false;
  }

}
