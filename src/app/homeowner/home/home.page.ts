import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { HomeownerService } from 'src/app/services/homeowner/homeowner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  electricians:any = [];
  avatar_url: any = environment.avatar_url
  loading = false;
  constructor(
    private homeownerService: HomeownerService,
    private toastController: ToastController,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.app.reloadUser();
    this.getListActiveElectrician();
  }

  getListActiveElectrician() {
    this.loading = true;
    this.homeownerService.getActiveElectricians()
       .pipe(
         finalize(() => {
          //loading part rajud ni
          setTimeout(() => { 
          this.loading = false;
          }, 300);
         })
       ).subscribe((response:any) => {
         this.electricians = response;
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
