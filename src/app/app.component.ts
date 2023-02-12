import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthJWTService } from './services/AuthJWT/auth-jwt.service';
import { environment } from 'src/environments/environment';
import { AuthAPIService } from './services/AuthAPI/auth-api.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isHomeowner = false;
  isElectrician = false;
  Name = "";
  Email = ""
  url = "";
  avatar_url: any = environment.avatar_url;
  loading = false;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' }
   
  ];

  public homeownerPages = [
    { title: 'Home', url: '/Homeowner/Home', icon: 'home' },
    { title: 'Profile', url: '/Homeowner/Profile', icon: 'person' },
    { title: 'JobOrders', url: '/Homeowner/JobOrders', icon: 'reader' },
    { title: 'Transaction Logs', url: '/Homeowner/TransactionLogs', icon: 'newspaper' },
    { title: 'Change Password', url: '/Homeowner/ChangePassword', icon: 'cog' },
    { title: 'About Us', url: '/aboutus', icon: 'people' },
  ];

  public electricianPages = [
    { title: 'Home', url: '/Electrician/Home', icon: 'home' },
    { title: 'Profile', url: '/Electrician/Profile', icon: 'person' },
    { title: 'JobOrders', url: '/Electrician/JobOrders', icon: 'reader' },
    { title: 'Subscription', url: '/Electrician/Subscription', icon: 'heart' },
    { title: 'Transaction Logs', url: '/Electrician/TransactionLogs', icon: 'newspaper' },
    { title: 'Change Password', url: '/Electrician/ChangePassword', icon: 'cog' },
    { title: 'About Us', url: '/aboutus', icon: 'people' },
  ];

  public appPages2 = [
    { title: 'Logout', url: '/login', icon: 'arrow-forward' }
  ];
  constructor(
    private authJWTService: AuthJWTService,
    private navCtrl: NavController,
    private authAPI: AuthAPIService,
    private toastController: ToastController
  ) {
    if (this.authJWTService.isAuthenticated()) {
      this.isHomeowner = this.authJWTService.isHomeowner();
      this.isElectrician = this.authJWTService.isElectrician();
      this.Name = this.authJWTService.getName();
      this.Email = this.authJWTService.getEmail();
      this.url = this.authJWTService.getPicUrl();
    } else {
      this.isHomeowner = false;
      this.isElectrician = false;
      this.Name = "";
      this.Email = ""
      this.url = "";
    }
  }

  ngOnInit(): void {
    this.redirectUser();
  }

  public reloadUser() {
    if (this.authJWTService.isAuthenticated()) {
      this.isHomeowner = this.authJWTService.isHomeowner();
      this.isElectrician = this.authJWTService.isElectrician();
      this.Name = this.authJWTService.getName();
      this.Email = this.authJWTService.getEmail();
      this.url = this.authJWTService.getPicUrl();
    } else {
      this.isHomeowner = false;
      this.isElectrician = false;
      this.Name = "";
      this.Email = ""
      this.url = "";
    }
  }

  public redirectUser() {
    if (this.authJWTService.isAuthenticated()) {
      this.navCtrl.navigateRoot(this.authJWTService.getUsertype());
    }
  }

  public logout() {
    this.loading = true;
    this.authAPI.logout()
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
        localStorage.removeItem("token");
        this.reloadUser();
        this.navCtrl.navigateRoot("/login")
      } else {
        this.presentToast(response.message)
      }
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
