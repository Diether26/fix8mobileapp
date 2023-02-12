import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthAPIService } from 'src/app/services/AuthAPI/auth-api.service';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  me:any = {};
  NewDate:any="";
  avatar_url: any = environment.avatar_url
  loading = false;
  constructor(
    private toastController: ToastController,
    private app: AppComponent,
    private authapiService: AuthAPIService
  ) { }

  ngOnInit() {
    this.getMyDetails();
  }

  editprofile(){
    console.log("TEst Click!");
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
      this.me = response.userData;//dle tanan largo ra response imong ibutang
      this.me.Birthdate = new Date(this.me.Birthdate).toDateString();
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
  }
}
